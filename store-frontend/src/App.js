// src/App.js
import './App.css';
import Navbar from './components/Navbar/components/Navbar';
import CategoryNavbar from './components/Categories/CategoryNavbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Navbar/components/Home';
import About from './components/Drawers/components/About/components/About';
import Signup from './components/Authentication/components/SignupForm'
import Login from './components/Authentication/components/LoginForm';
import AdminDashboard from './components/Pages/Dashboards/AdminDashboard/components/AdminDashboard';
import SellerDashboard from './components/Pages/Dashboards/SellerDashboard/components/SellerDashboard';
import ProfileDrawer from './components/Drawers/components/Profile/components/ProfileDrawer';
import GoogleSignIn from './components/Authentication/components/GoogleSignIn'; // Import GoogleSignIn
import React, { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      // Fetch and set user info if needed
    }
  }, []);

  const handleLogin = (token, user) => {
    sessionStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setUserInfo(user);
    if (user.role === 'admin') {
      navigate('/admin-dashboard', { state: { message: 'Login successful!' } });
    } else if (user.role === 'seller') {
      navigate('/seller-dashboard', { state: { message: 'Login successful!' } });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUserInfo(null);
    navigate('/', { state: { message: 'You have been logged out successfully.' } });
  };

  return (
    <div className="App">
      <Navbar
        isAuthenticated={isAuthenticated}
        userInfo={userInfo}
        onLogout={handleLogout}
        onProfileClick={() => setShowProfileDrawer(true)}
      />
      <CategoryNavbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
        </Routes>
        <GoogleSignIn onLogin={handleLogin} /> {/* Add GoogleSignIn component */}
      </div>
      <ProfileDrawer
        isOpen={showProfileDrawer}
        onClose={() => setShowProfileDrawer(false)}
        isAuthenticated={isAuthenticated}
        userInfo={userInfo}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
