import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserCircle, LogOut } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import type { RootState } from '../store';
import Logo from './Logo';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <Logo className="main-nav-logo" />
      <div>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="main-nav-item">
              <UserCircle className="inline-block mr-1" />
              {user?.firstName}
            </Link>
            <button onClick={handleLogout} className="main-nav-item">
              <LogOut className="inline-block mr-1" />
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" className="main-nav-item">
            <UserCircle className="inline-block mr-1" />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;