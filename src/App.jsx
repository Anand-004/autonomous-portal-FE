
import './App.css'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('token');
    if (authStatus) {
      setIsAuthenticated(true);
    }
  }, []);

 

  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          
          {/* Protected Route */}
          <Route 
            path="/home" 
            element={isAuthenticated ? <HomePage /> : <LoginPage />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
