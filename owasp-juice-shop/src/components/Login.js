import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSS/Login.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Both fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });

      // Save token and username in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', username);

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
