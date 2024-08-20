import React, { useState } from 'react';
import '../styles/Signup.css';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    firstName: '',
    lastName: '',
    role: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.age || !formData.firstName || !formData.lastName) {
      setErrorMessage('All fields are required!');
      return;
    }

    if (!validator.isEmail(formData.email)) {
      setErrorMessage('Invalid email format!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch("/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        return;
      }
      
      setSuccessMessage('Signup successful! Please login.');
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        firstName: '',
        lastName: '',
        role: '',
      });

      navigate('/login', { state: { message: 'Signup successful! Please login.' } });

    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Signup</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        
        <label>Role:</label>
        <div className="role-radio-buttons">
          <input
            type="radio"
            id="role-seller"
            name="role"
            value="seller"
            onChange={handleChange}
          />
          <label htmlFor="role-seller">Seller</label>

          <input
            type="radio"
            id="role-buyer"
            name="role"
            value="buyer"
            onChange={handleChange}
          />
          <label htmlFor="role-buyer">Buyer</label>
        </div>

        <button type="submit">Signup</button>

        <div className="login-link">
          Already registered? <a href="/login">Login instead</a>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
