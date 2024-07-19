import React, { useState } from 'react';
import './styles/login.css'; // Import CSS for styling (optional)

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMessage('Username and Password are required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        return;
      }

      // Successful Login Logic (handle response data or redirect)
      console.log('Login successful!');
      setIsLoggedIn(true);
      const data = await response.json();
      // Assuming the server returns a token in the response
      localStorage.setItem('authToken', data.token); // Store token for further use
      // Redirect to a protected area of the application
      window.location.href = '/protected-route'; 

    }
      catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
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
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="submit my-3">
          <button type="submit">Login</button>
          {isLoggedIn && (
              <div className="success-message">
                Login successful!
              </div>
            )}
        </div>
        <div className="signup-link">
          Not registered? <a href="/signup">Register now</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
