import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { PASSWORD } from '../constants';

interface LoginPageProps {
  onLogin: () => void;
}

const LockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const AniwLinkLogo: React.FC = () => (
    <div className="flex items-center space-x-3 mb-8">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2L2 7V17L12 22L22 17V7L12 2ZM4 8.23607L12 13L20 8.23607V15.7639L12 20L4 15.7639V8.23607Z" fill="#A3E635"/>
        </svg>
        <span className="font-bold text-3xl text-white">aniw link</span>
    </div>
);

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setError('');
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('authKey', password);
      onLogin();
      navigate('/dashboard');
    } else {
      setError('Invalid password. Access denied.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark p-4" style={{ background: 'radial-gradient(circle, #0a180a, #050a05 70%)' }}>
      <div className="w-full max-w-md p-8 bg-brand-gray rounded-2xl border border-brand-light-gray shadow-2xl shadow-black/30">
        <AniwLinkLogo />
        <h2 className="text-2xl font-bold text-white mb-2">Admin Panel Access</h2>
        <p className="text-gray-400 mb-6">Enter your password to manage your links.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              autoComplete="current-password" 
              required 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<LockIcon />}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <div>
            <Button type="submit" className="w-full">
              Unlock
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;