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
    
    console.log('Attempting to login with:', { email, password });
    
    try {
      const response = await login(email, password);
      console.log('Login response (normalized):', response);
      
      // Nettoyage des anciennes données d'authentification
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      
      if (response && response.token) {
        // Utilisation de la réponse normalisée conforme à Swagger
        const token = response.token;
        
        // Enregistre le token dans Redux
        dispatch(setCredentials({ token }));
        console.log('Token stored in Redux');
        
        // Stocker dans localStorage ou sessionStorage selon l'option "Remember me"
        if (rememberMe) {
          localStorage.setItem('token', token);
          console.log('Token stored in localStorage (remember me)');
        } else {
          sessionStorage.setItem('token', token);
          console.log('Token stored in sessionStorage');
        }
        
        // Vérifier si des données utilisateur sont disponibles dans la réponse originale
        const originalResponse = response.originalResponse;
        
        if (originalResponse && originalResponse.body) {
          // Format API mémoire
          if (originalResponse.body.firstName && originalResponse.body.lastName && originalResponse.body.email) {
            const userData = {
              firstName: originalResponse.body.firstName,
              lastName: originalResponse.body.lastName,
              email: originalResponse.body.email
            };
            dispatch(setUser(userData));
            console.log('User data stored in Redux:', userData);
          }
        }
        
        // Attendre que les données soient stockées avant de naviguer
        setTimeout(() => {
          console.log('Navigating to profile page...');
          navigate('/profile');
        }, 100);
      } else {
        console.error('Format de réponse inattendu:', response);
        setError('Erreur de format de réponse');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  // Remplir automatiquement les champs pour tester
  const fillTestCredentials = () => {
    setEmail('tony@stark.com');
    setPassword('password123');
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <UserCircle className="sign-in-icon" size={48} />
        <h1>Sign In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isLoading ? (
          <p className="text-gray-400 my-4">Connexion en cours...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
            
            {/* Bouton pour debug uniquement */}
            <button 
              type="button" 
              onClick={fillTestCredentials}
              style={{ marginTop: '10px', backgroundColor: '#555', padding: '8px' }}
            >
              Remplir identifiants de test
            </button>
          </form>
        )}
      </section>
    </main>
  );
};

export default Login;