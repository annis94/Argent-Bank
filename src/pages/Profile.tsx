import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../services/api';
import { setUser } from '../store/slices/authSlice';
import { RootState } from '../store';
import { Edit as UserEdit } from 'lucide-react';

const accounts = [
  {
    title: "Argent Bank Checking (x8349)",
    amount: "$2,082.79",
    description: "Available Balance"
  },
  {
    title: "Argent Bank Savings (x6712)",
    amount: "$10,928.42",
    description: "Available Balance"
  },
  {
    title: "Argent Bank Credit Card (x8349)",
    amount: "$184.30",
    description: "Current Balance"
  }
];

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const authState = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, token, user } = authState;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('Auth state in Profile:', { isAuthenticated, token, user });
  console.log('Token from localStorage:', localStorage.getItem('token'));
  console.log('Token from sessionStorage:', sessionStorage.getItem('token'));

  useEffect(() => {
    // Si l'utilisateur n'est pas authentifié, redirigez vers la page de connexion
    if (!isAuthenticated && !localStorage.getItem('token') && !sessionStorage.getItem('token')) {
      console.log('User not authenticated, redirecting to login page');
      navigate('/login');
      return;
    }
    
    // Si nous avons déjà des données utilisateur dans Redux, utilisons-les
    if (user) {
      console.log('User data already in Redux, using it:', user);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setLoading(false);
      return;
    }
    
    // Sinon, récupérons les données utilisateur depuis l'API
    const fetchUserProfile = async () => {
      try {
        console.log('Fetching user profile...');
        const userData = await getUserProfile();
        console.log('User profile data received (normalized):', userData);
        
        // Utilisez directement les données normalisées
        if (userData) {
          const userInfo = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email || ''
          };
          
          dispatch(setUser(userInfo));
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          console.log('User profile data stored in Redux:', userInfo);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, dispatch, navigate, user]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('Updating user profile...', { firstName, lastName });
      const response = await updateUserProfile(firstName, lastName);
      console.log('Update profile response (normalized):', response);
      
      // Mettre à jour les données dans Redux avec les données normalisées
      if (response) {
        const userInfo = {
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email || (user ? user.email : '')
        };
        
        dispatch(setUser(userInfo));
        console.log('Updated user data stored in Redux:', userInfo);
      }
      
      setEditMode(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back</h1>
          <p className="text-center">Loading your profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main bg-dark">
        <div className="header">
          <h1>Error</h1>
          <p className="text-center">{error}</p>
          <button 
            className="edit-button" 
            onClick={() => navigate('/login')}
            style={{ marginTop: '20px' }}
          >
            Return to Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{!editMode && `${firstName} ${lastName}!`}</h1>
        {!editMode ? (
          <button className="edit-button" onClick={() => setEditMode(true)}>
            <UserEdit size={16} />
            Edit Name
          </button>
        ) : (
          <form onSubmit={handleEditSubmit} className="edit-form">
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" className="save-button">Save</button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => {
                  setEditMode(false);
                  if (user) {
                    setFirstName(user.firstName);
                    setLastName(user.lastName);
                  }
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
        <section key={index} className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
};

export default Profile;