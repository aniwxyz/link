import React from 'react';
import Button from './Button';

interface HeaderProps {
  onLogout: () => void;
}

const AniwLinkLogo: React.FC = () => (
    <div className="flex items-center space-x-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2L2 7V17L12 22L22 17V7L12 2ZM4 8.23607L12 13L20 8.23607V15.7639L12 20L4 15.7639V8.23607Z" fill="#A3E635"/>
        </svg>
        <span className="font-bold text-xl text-white">aniw link</span>
    </div>
);


const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <AniwLinkLogo />
        <Button onClick={onLogout} variant="secondary">
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;