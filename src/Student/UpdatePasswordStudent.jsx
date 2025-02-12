import React, { useState } from "react";
import axios from '../Components/AxiosConfig'; // Corrected import path
import { toast } from "react-toastify"; // For notifications
import "react-toastify/dist/ReactToastify.css"; // CSS for toast notifications
import "../Student/UpdatePasswordStudent.css";


const UpdatePasswordStudent = () => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for better UX

    // Retrieve the token from local storage or state
    const token = localStorage.getItem('authToken'); // Assuming JWT token is saved in localStorage

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if passwords are not the same before sending request
        if (currentPassword === newPassword) {
            setMessage("New password can't be the same as the current password.");
            return;
        }

        try {
            setLoading(true); // Show loading state

            // Send the request to the API with the Authorization header containing the token
            const response = await axios.post(
                'https://localhost:44369/api/account/update-password',
                {
                    email,
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
                    },
                }
            );

            // Show success message using toast notification
            toast.success('Password updated successfully!');
            setMessage(response.data.message || 'Password updated successfully');
        } catch (error) {
            console.error("Error updating password:", error);
            const errorMessage = error.response?.data?.message || 'Password update failed';
            toast.error(errorMessage); // Show error message if update fails
            setMessage(errorMessage);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <h2>Update Password</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Current Password:
                    <input
                        type="password"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    New Password:
                    <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                </label>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Password'}
                </button>
            </form>
            {message && <p>{message}</p>} {/* Display message to user */}
        </div>
    );
};

export default UpdatePasswordStudent;