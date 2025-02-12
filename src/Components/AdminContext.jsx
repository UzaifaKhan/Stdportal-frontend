import React, { createContext, useState, useContext } from 'react';
import './AdminContext.css';

// Create context for Admin state management
const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Role definitions with permissions
  const [roles, setRoles] = useState({
    student: { read: true, write: false },
    accountAdmin: { read: true, write: true },
    admin: { read: true, write: true, delete: true },
  });

  // Users state that will hold the user data
  const [users, setUsers] = useState([]);

  // Register user function to add users to the users state with necessary details
  const registerUser = (user, role = 'student') => {
    if (!user.name || !role) {
      console.error("User name and role are required!");
      return;
    }

    setUsers((prevUsers) => [
      ...prevUsers,
      {
        id: prevUsers.length + 1,  // Adding a unique ID for each user
        name: user.name,
        role: role || 'student',  // Default to student role if not provided
        fatherName: user.fatherName || '',
        address: user.address || '',
        profilePic: user.profilePic || 'https://via.placeholder.com/150', // default pic
        phone: user.phone || '',
        fatherPhone: user.fatherPhone || '',
        cgpa: user.cgpa || '',
        result: user.result || '',
      },
    ]);
  };

  // Update user info function if needed (using 'id' to update user)
  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  };

  // Return the context provider wrapping the children components
  return (
    <AdminContext.Provider value={{ roles, registerUser, users, updateUser }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to access admin context data
export const useAdmin = () => useContext(AdminContext);
