import React, { useState } from 'react';
import './styles/login.css';
import Spinner from './Spinner'; // Import Spinner component
import UserRedirect from './Pages/userRedirect';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Show spinner when form is submitting

    if (!formData.username || !formData.password) {
      setErrorMessage('Username and Password are required!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Login failed');
        setLoading(false);
        return;
      }

      const responseData = await response.json();
      const token = responseData.data?.token;
      const userData = responseData.data?.user;

      if (token && userData) {
        onLogin(token, userData);
        setAuthToken(token);
        setIsLoggedIn(true);
      } else {
        setErrorMessage('Login failed: Token or user information is missing in the response.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please try again.');
    } finally {
      setLoading(false); // Hide spinner when submission is done
    }
  };

  return (
    <div className="login-container">
      {loading && <Spinner />} {/* Show spinner while loading */}
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
        <div className="signup-link">
          Not registered? <a href="/signup">Register now</a>
        </div>
      </form>
      {isLoggedIn && authToken && <UserRedirect token={authToken} />}
    </div>
  );
};

export default LoginForm;
