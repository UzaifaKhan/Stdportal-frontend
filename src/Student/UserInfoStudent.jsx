import React, { useState } from 'react';
import axios from 'axios';
import "../Student/UserInfoStudent.css";

const UserInfoStudent = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleFetchUserInfo = async () => {
    setLoading(true);
    setMessage('');
    try {
      let url = `https://localhost:44369/api/user/userinfo?`;
      if (userId) url += `userId=${userId}&`;
      if (name) url += `name=${name}`;

      if (url.endsWith('&')) {
        url = url.slice(0, -1); // Remove trailing '&' if any
      }

      const response = await axios.get(url);
      if (response.status === 200) {
        setUserInfo(response.data);
        setUpdatedName(response.data.name);
        setUpdatedAddress(response.data.address);
      } else {
        setMessage('User not found');
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
      setMessage('User not found or an error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.put('https://localhost:44369/api/User/update', {
        userId: userInfo.id, // Send the userId along with the request
        name: updatedName,
        address: updatedAddress
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming JWT stored in localStorage
        }
      });

      if (response.data.success) {
        setMessage("User information updated successfully!");
        setUserInfo(prevData => ({
          ...prevData,
          name: updatedName,
          address: updatedAddress
        }));
        setIsEditing(false); // Stop editing after successful update
      } else {
        setMessage("Failed to update user information.");
      }
    } catch (error) {
      console.error("Error updating user data", error);
      setMessage("Error updating user data");
    }
  };

  return (
    <div className="user-info-container">
      <h3 className="title">Find Your Information</h3>
      <div className="input-container">
        <input
          type="number"
          className="input-field"
          placeholder="Enter your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleFetchUserInfo} className="fetch-button" disabled={loading}>
          {loading ? 'Loading...' : 'Get Info'}
        </button>
      </div>

      {userInfo && !isEditing && (
        <div className="user-info-display">
          <h4 className="user-info-title">User Information</h4>
          <div className="user-info-data">
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Father Name:</strong> {userInfo.fatherName}</p>
            <p><strong>Address:</strong> {userInfo.address}</p>
            <p><strong>Phone:</strong> {userInfo.phone}</p>
            <p><strong>Father Phone:</strong> {userInfo.fatherPhone}</p>
            <p><strong>CGPA:</strong> {userInfo.cgpa}</p>
            <p><strong>Result:</strong> {userInfo.result}</p>
            <p><strong>Role:</strong> {userInfo.role}</p>
            <button onClick={() => setIsEditing(true)}>Edit Info</button>
          </div>
        </div>
      )}

      {userInfo && isEditing && (
        <div className="user-info-display">
          <h4 className="user-info-title">Update User Information</h4>
          <form onSubmit={handleUpdateUserInfo}>
            <label>Name:</label>
            <input
              type="text"
              className="input-field"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <label>Address:</label>
            <input
              type="text"
              className="input-field"
              value={updatedAddress}
              onChange={(e) => setUpdatedAddress(e.target.value)}
            />
            <button type="submit" className="fetch-button">Update</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default UserInfoStudent;
