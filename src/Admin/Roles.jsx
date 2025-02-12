import React, { useState } from 'react';
import "../Admin/Roles.css";

const Roles = () => {
  const [user, setUser] = useState({
    name: '',
    fatherName: '',
    address: '',
    phone: '',
    fatherPhone: '',
    cgpa: '',
    result: '',
    role: 'student', // Default role
    profilePic: null, // Set as null initially for file upload
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null);     // Error state
  const [success, setSuccess] = useState(null);  // Success state for feedback

  // Handle input change
  const handleChange = (field, value) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  // Handle file change (for profile picture)
  const handleFileChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, profilePic: e.target.files[0] }));
  };

  // Validate user input
  const validateInputs = () => {
    const { name, phone, cgpa } = user;
    if (!name || !phone || !cgpa) {
      alert('Please fill out all required fields: Name, Phone, and CGPA.');
      return false;
    }
    return true;
  };

  // Handle registration
  const handleRegister = async () => {
    if (!validateInputs()) return;

    // Create form data for file upload
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      if (key !== 'profilePic') formData.append(key, value); // Don't append profilePic here, it's handled separately
    });

    if (user.profilePic) {
      formData.append('profilePic', user.profilePic);
    }

    setLoading(true);
    setError(null);
    setSuccess(null);  // Reset success message

    try {
      const response = await fetch('https://localhost:44369/api/User/register', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setSuccess('User registered successfully!');
        setUser({
          name: '',
          fatherName: '',
          address: '',
          phone: '',
          fatherPhone: '',
          cgpa: '',
          result: '',
          role: 'student',
          profilePic: null,
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to register user.');
      }
    } catch (err) {
      setError('An error occurred while registering the user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="roles-container">
      <h2>Assign Roles for Users</h2>

      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => window.history.back()}
      >
        Back to Dashboard
      </button>

      {/* Form */}
      <form className="roles-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Father's Name"
          value={user.fatherName}
          onChange={(e) => handleChange('fatherName', e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={user.address}
          onChange={(e) => handleChange('address', e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={user.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Father's Phone"
          value={user.fatherPhone}
          onChange={(e) => handleChange('fatherPhone', e.target.value)}
        />
        <input
          type="text"
          placeholder="CGPA"
          value={user.cgpa}
          onChange={(e) => handleChange('cgpa', e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Result"
          value={user.result}
          onChange={(e) => handleChange('result', e.target.value)}
        />

        {/* File upload for profile picture */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <select
          value={user.role}
          onChange={(e) => handleChange('role', e.target.value)}
        >
          <option value="student">Student</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <button className="register-button" onClick={handleRegister} disabled={loading}>
          {loading ? 'Registering...' : 'Register User'}
        </button>
      </form>

      {/* Error and Success Messages */}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Roles;
