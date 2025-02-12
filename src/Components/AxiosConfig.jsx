// src/AxiosConfig.jsx
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44369/api', // Ensure this is the correct base URL for your API
});

// Add a request interceptor to include the JWT token in the Authorization header
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    // Handle any errors that occur during the request configuration
    return Promise.reject(error);
});

// Optionally, you can add a response interceptor for handling responses globally
axiosInstance.interceptors.response.use(
    (response) => {
        // Return the response as is
        return response;
    },
    (error) => {
        // Handle errors globally (e.g., log them, redirect to login, etc.)
        // You can also check for specific status codes
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            console.error('Unauthorized access - redirecting to login');
            // Optionally, you can redirect to the login page
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;