import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserCircle } from 'lucide-react';
import { login } from '../services/api';
import { setCredentials, setUser } from '../store/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await login(email, password);
      
      // Nettoyage des anciennes données d'authentification
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      
      if (response && response.token) {
        const token = response.token;
        
        // Enregistre le token dans Redux
        dispatch(setCredentials({ token }));
        
        // Stocker dans localStorage ou sessionStorage selon l'option "Remember me"
        if (rememberMe) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }
        
        // Vérifier si des données utilisateur sont disponibles
        const originalResponse = response.originalResponse;
        
        if (originalResponse && originalResponse.body) {
          if (originalResponse.body.firstName && originalResponse.body.lastName && originalResponse.body.email) {
            const userData = {
              firstName: originalResponse.body.firstName,
              lastName: originalResponse.body.lastName,
              email: originalResponse.body.email
            };
            dispatch(setUser(userData));
          }
        }
        
        navigate('/profile');
      } else {
        setError('Format de réponse invalide');
      }
    } catch (err: any) {
      if (err.response) {
        // Erreur serveur avec réponse
        if (err.response.status === 401) {
          setError('Email ou mot de passe incorrect');
        } else if (err.response.status === 500) {
          setError('Erreur serveur. Veuillez réessayer plus tard.');
        } else {
          setError('Une erreur est survenue. Veuillez réessayer.');
        }
      } else if (err.request) {
        // Erreur réseau
        setError('Problème de connexion. Vérifiez votre connexion internet.');
      } else {
        // Autre erreur
        setError('Une erreur inattendue est survenue.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de test uniquement en développement
  const fillTestCredentials = () => {
    if (process.env.NODE_ENV === 'development') {
      setEmail('tony@stark.com');
      setPassword('password123');
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <UserCircle className="sign-in-icon" />
        <h1>Sign In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isLoading ? (
          <div className="loading-spinner">
            <p className="text-gray-400 my-4">Connexion en cours...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Username</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button" disabled={isLoading}>
              Sign In
            </button>
            
            {process.env.NODE_ENV === 'development' && (
              <button 
                type="button" 
                onClick={fillTestCredentials}
                className="test-credentials-button"
                disabled={isLoading}
              >
                Remplir identifiants de test
              </button>
            )}
          </form>
        )}
      </section>
    </main>
  );
};

export default Login;