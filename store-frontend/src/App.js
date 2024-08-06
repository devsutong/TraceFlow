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
      // Fetch user information using the token if needed
      setIsAuthenticated(true);
      // Set userInfo if it's stored or fetch it using the token
    }
  }, []);

  const handleLogin = (token, user) => {
    sessionStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setUserInfo(user);
    console.log(user.role);
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

  const handleUpdateProfile = async (profileData) => {
    try {
      const response = await fetch('/user/', { // Adjust the endpoint as per your API setup
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`, // Use the token stored in sessionStorage
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const data = await response.json();
      console.log('Profile updated successfully:', data);
      setUserInfo(data); // Update userInfo state with the response data if needed
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} userInfo={userInfo} onLogout={handleLogout} onProfileClick={() => setShowProfileModal(true)} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          {/* Other routes */}
        </Routes>
      </div>
      <ProfileModal
        show={showProfileModal}
        handleClose={() => setShowProfileModal(false)}
        isAuthenticated={isAuthenticated}
        userInfo={userInfo}
        onLogout={handleLogout}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}

export default App;
