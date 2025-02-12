import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '..Admin/UpdateUserForm.css'
const UpdateUserForm = ({ userId }) => {
  const [userData, setUserData] = useState({
    name: '',
    address: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5209/api/User/userinfo?userId=${userId}`);
        setUserData({
          name: response.data.name,
          address: response.data.address
        });
      } catch (error) {
        console.error("Error fetching user data", error);
        setMessage("Error fetching user data");
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://localhost:44369/api/User/update`, {
        userId: userId, // Send the userId along with the request
        name: userData.name,
        address: userData.address
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // assuming you store JWT token in localStorage
        }
      });

      if (response.data.success) {
        setMessage("User information updated successfully!");
      } else {
        setMessage("Failed to update user information.");
      }
    } catch (error) {
      console.error("Error updating user data", error);
      setMessage("Error updating user data");
    }
  };

  return (
    <div>
      <h3>Update User Information</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateUserForm;
