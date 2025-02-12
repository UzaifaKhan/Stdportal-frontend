import React, { useEffect, useState } from 'react';
import '../Admin/Data.css';

const Data = () => {
  const [allUsers, setAllUsers] = useState([]); // Store all users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://localhost:44369/api/User/allusers'); // Backend API endpoint

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // Transform data to match frontend expectations
        const transformedData = data.map(user => ({
          id: user.id,
          name: user.name || 'N/A',
          fatherName: user.fatherName || 'N/A',
          phone: user.phone || 'N/A',
          cgpa: user.cgpa || 'N/A',
          result: user.result || 'N/A',
          role: user.role || 'N/A',
          profilePic: user.profilePic ? `https://localhost:44369${user.profilePic}` : '', // Ensure proper profile picture URL
        }));

        setAllUsers(transformedData);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message || 'An error occurred while fetching users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`https://localhost:44369/api/User/delete/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Error deleting user: ${response.status} - ${response.statusText}`);
        }

        setAllUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        alert("User deleted successfully");
      } catch (err) {
        alert("Failed to delete user: " + err.message);
      }
    }
  };

  const editUser = async (id) => {
    const updatedName = prompt("Enter new name:");
    const updatedFatherName = prompt("Enter new father's name:");
    const updatedPhone = prompt("Enter new phone number:");
    const updatedCgpa = prompt("Enter new CGPA:");
    const updatedProfilePic = prompt("Enter new profile picture URL:");

    if (!updatedName) {
      alert("Name is required.");
      return;
    }

    const updatedUser = {
      name: updatedName,
      fatherName: updatedFatherName || '',
      phone: updatedPhone || '',
      cgpa: updatedCgpa || '',
      profilePic: updatedProfilePic || '', // Update profile picture
    };

    try {
      const response = await fetch(`https://localhost:44369/api/User/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error(`Error updating user: ${response.status} - ${response.statusText}`);
      }

      setAllUsers(prevUsers => prevUsers.map(user => user.id === id ? { ...user, ...updatedUser } : user));
      alert("User updated successfully");
    } catch (err) {
      alert("Failed to update user: " + err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="data-container">
      <h2>Users Data</h2>
      {allUsers.length > 0 ? (
        <ul className="user-list">
          {allUsers.map((user) => (
            <li key={user.id} className="user-item">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Father's Name:</strong> {user.fatherName}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>CGPA:</strong> {user.cgpa}</p>
              <p><strong>Result:</strong> {user.result}</p>
              <p><strong>Role:</strong> {user.role}</p>
              {user.profilePic && (
                <div>
                  <strong>Profile Picture:</strong>
                  <img
                    src={user.profilePic}
                    alt={`${user.name}'s Profile`}
                    className="profile-pic"
                  />
                </div>
              )}
              <div className="button-container">
                <button onClick={() => editUser(user.id)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Data;
