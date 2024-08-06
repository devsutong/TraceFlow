import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Signup from './components/SignupForm';
import Login from './components/LoginForm';
import AdminDashboard from './components/Pages/Dashboards/AdminDashboard';
import SellerDashboard from './components/Pages/Dashboards/SellerDashboard';
import ProfileModal from './components/ProfileModal';
import React, { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);

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
        onProfileClick={() => setShowProfileModal(true)}
      />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
        </Routes>
      </div>
      <ProfileModal
        show={showProfileModal}
        handleClose={() => setShowProfileModal(false)}
        isAuthenticated={isAuthenticated}
        userInfo={userInfo}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
