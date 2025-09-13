
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RedirectPage from './pages/RedirectPage';
import NotFoundPage from './pages/NotFoundPage';
import { PASSWORD } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check session storage for auth state
    try {
      const storedAuth = sessionStorage.getItem('isAuthenticated');
      const storedPassword = sessionStorage.getItem('authKey');
      return storedAuth === 'true' && storedPassword === PASSWORD;
    } catch (e) {
      return false;
    }
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('authKey');
    setIsAuthenticated(false);
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardPage onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="/:shortId" element={<RedirectPage />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
