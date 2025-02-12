import React, { useState, useEffect } from "react";
import axios from "../Components/AxiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Manager/UpdatePasswordManager.css";

const UpdatePasswordManager = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');

    // Retrieve the token from localStorage when the component mounts
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            console.log("Token retrieved:", storedToken); // Debugging
        } else {
            setMessage("You must be logged in to change the password.");
        }
    }, []);

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentPassword === newPassword) {
        setMessage("New password can't be the same as the current password.");
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        setMessage("You must be logged in to change the password.");
        return;
    }

    try {
        setLoading(true);

        console.log("Token being sent:", token); // Debugging

        const response = await axios.put(
            'https://localhost:44369/api/account/update-password',
            {
                currentPassword,
                newPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        toast.success('Password updated successfully!');
        setMessage(response.data.message || 'Password updated successfully');
    } catch (error) {
        console.error("Error updating password:", error);
        const errorMessage = error.response?.data?.message || 'Password update failed';
        toast.error(errorMessage);
        setMessage(errorMessage);
    } finally {
        setLoading(false);
    }
};
    return (
        <div>
            <h2>Update Password</h2>
            <form onSubmit={handleSubmit}>
                <label>Current Password:</label>
                <input
                    type="password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
                <br />
                <label>New Password:</label>
                <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
export default UpdatePasswordManager;