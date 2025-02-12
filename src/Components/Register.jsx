import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from './AxiosConfig';
import './Register.css';

function Register() {
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate that passwords match
        if (registerData.password !== registerData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        // Check if all fields are filled
        if (!registerData.username || !registerData.email || !registerData.password || !registerData.confirmPassword) {
            setMessage('All fields are required');
            return;
        }

        try {
            // Send registration request to the backend
            const response = await axios.post('/account/register', {
                username: registerData.username,
                email: registerData.email,
                password: registerData.password,
                confirmPassword: registerData.confirmPassword // Ensure both passwords are sent for validation
            });

            // Handle response message from backend
            setMessage(response.data.message);

            // After successful registration, redirect to login page
            if (response.data.message === "Registration successful.") {
                navigate('/login'); // Redirect to login page
            }

        } catch (error) {
            // If registration fails, handle errors and display the message
            const errorMessage = error.response?.data?.message || 'Registration failed';
            setMessage(errorMessage);
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="form">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                />
                <button type="submit" className="submit-btn">Register</button>
            </form>
            {message && <div className="message">{message}</div>}
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}

export default Register;
