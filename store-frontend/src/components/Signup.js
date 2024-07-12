import React, { useState } from 'react';
import './Signup.css';
import validator from 'validator';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    firstName: '',
    lastName: '',
    role: '', // set default role if applicable
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

    // Basic client-side validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.age || !formData.firstName || !formData.lastName) {
      setErrorMessage('All fields are required!');
      return;
    }

    if (!validator.isEmail(formData.email)) {
      setErrorMessage('Invalid email format!');
      return;
    }
    else(console.log(formData.email))

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        return;
      }
      
      // Successful Signup Logic
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

      // Redirect to Login Page after successful signup
      handleSuccessfulSignup();

    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  // Function to handle successful signup and redirect
  function handleSuccessfulSignup() {
    window.location.href = '/login';
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
      <h2>Signup</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
        
        <label>Role:</label>
        <div className="role-radio-buttons">
          <input type="radio" id="role-user" name="role" value="user" onChange={handleChange} />
          <label htmlFor="role-user">User</label>
          <input type="radio" id="role-admin" name="role" value="admin" onChange={handleChange} />
          <label htmlFor="role-admin">Admin</label>
        </div>
        <div className="submit my-3">
            <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
