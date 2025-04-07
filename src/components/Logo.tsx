import { Link } from 'react-router-dom';
import argentBankLogo from '../assets/argent-bank-logo.svg';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <Link to="/" className={`block ${className}`}>
      <img
        src={argentBankLogo}
        alt="Argent Bank Logo"
        className="w-[200px] h-auto"
      />
    </Link>
  );
};

export default Logo; 