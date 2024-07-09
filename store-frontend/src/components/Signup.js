import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail'; // Import the specific function
import './Signup.css'; // Import the CSS file
//import encryptPassword from '../../../store-api/authorization/controllers/AuthorizationController'

function Signup() {
  const [userName, setUserName] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // For error handling

  const handleSubmit = async (event) => {
    event.preventDefault();

    function validateEmail(email) {
      return isEmail(email);
    }

    // Validation (optional but recommended)
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Prepare data to send with hashed password
    const data = {
      firstName,
      lastName,
      age,
      email,
      //password: encryptPassword(password), // Use the imported function
    };

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.json();
      if (responseData.status) {
        console.log('Signup successful!', responseData.data);
        // Handle successful signup (e.g., redirect to login page or display success message)
        // Potentially store the received token securely (explained later)
      } else {
        setErrorMessage(responseData.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('Signup failed. Please try again.');
    } finally {
      // Clear form fields (optional)
      setfirstName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };
  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Sign Up</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required // Mark username field as required
        />
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
          required // Mark username field as required
        />
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
          required // Mark username field as required
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required // Mark username field as required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required // Mark email field as required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Mark password field as required
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required // Mark confirm password field as required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
