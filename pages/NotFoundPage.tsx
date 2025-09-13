
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark p-4 text-center" style={{ background: 'radial-gradient(circle, #0a180a, #050a05 70%)' }}>
      <div>
        <h1 className="text-6xl font-bold text-brand-green mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">Sorry, the page you are looking for does not exist.</p>
        <Link to="/">
          <Button>
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
