import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Manager/NavbarManager.css'; // Ensure the path is correct

const NavbarManager = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and role from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="data">DataManager</Link>
        </li>
        <li>
          <Link to="user-info">User Info</Link>
        </li>
        <li>
          <Link to="update-password">Update Password</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="navbar-link logout">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarManager;
