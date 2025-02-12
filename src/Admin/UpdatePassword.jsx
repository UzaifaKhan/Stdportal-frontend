import React, { useState } from "react";
import axios from "../Components/AxiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePassword = () => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token'); // Fetch the token from local storage

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        if (newPassword !== confirmPassword) {
            setMessage("New password and confirm password must match.");
            toast.error("New password and confirm password must match.");
            return;
        }

        if (currentPassword === newPassword) {
            setMessage("New password can't be the same as the current password.");
            toast.error("New password can't be the same as the current password.");
            return;
        }

        if (!token) {
            setMessage("You must be logged in to change the password.");
            toast.error("You must be logged in to change the password.");
            window.location.href = "/login"; // Redirect to login page
            return;
        }

        try {
            setLoading(true);

            // Send request to backend API to update the password
            const response = await axios.post(
                '/api/account/update-password',
                {
                    email,
                    currentPassword,
                    newPassword,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }, // Pass token for authorization
                }
            );

            // Handle success response
            toast.success('Password updated successfully!');
            setMessage(response.data.message || 'Password updated successfully');
        } catch (error) {
            // Handle errors
            if (error.response?.status === 401) {
                setMessage("Unauthorized. Please log in again.");
                toast.error("Unauthorized. Please log in again.");
                localStorage.removeItem('token'); // Clear the expired token
                localStorage.removeItem('role'); // Clear the role
                window.location.href = "/login"; // Redirect to login page
            } else if (error.response?.status === 404) {
                setMessage("User not found.");
                toast.error("User not found.");
            } else if (error.response?.status === 400) {
                setMessage(error.response.data.message || "Invalid request.");
                toast.error(error.response.data.message || "Invalid request.");
            } else {
                setMessage("Password update failed. Please try again.");
                toast.error("Password update failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="update-password-container">
            <h2>Update Password</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <label>Current Password:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
                <br />
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <br />
                <label>Confirm New Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Password'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdatePassword;