import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from './AxiosConfig'; // Ensure the AxiosConfig is correct
import './Login.css';

function Login({ setIsAuthenticated }) {
  const [loginData, setLoginData] = useState({
    loginIdentifier: '', // Email or Username
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/account/login', loginData); // API call to validate login
      const { token, role } = response.data;
  
      if (token && role) {
        localStorage.setItem('token', token); // Store the token in localStorage
        localStorage.setItem('role', role);  // Store the role in localStorage
        setIsAuthenticated(true);
  
        // Redirect based on role
        if (role === 'Admin') {
          navigate('/dashboard'); // Admin Dashboard
        }  else if (role === 'Manager') {
            navigate('/dashboard-manager'); // Manager Dashboard
        } else if (role === 'User ') {
          navigate('/dashboard-student'); // Student Dashboard
        }
      } else {
        setMessage('Login failed. No token or role received.');
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setIsAuthenticated(false);
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setMessage(errorMessage);
    }
  };
  
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="form">
        <input
          type="text"
          name="loginIdentifier"
          placeholder="Email or Username"
          value={loginData.loginIdentifier}
          onChange={handleLoginChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />
        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
      {message && <div className="message">{message}</div>}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
