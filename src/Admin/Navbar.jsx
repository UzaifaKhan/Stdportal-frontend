import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../Admin/Navbar.css"; // Ensure this path is correct.

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and role, then redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="roles">Roles</Link>
        <Link to="Data">UserManagementPage</Link>
        <Link to="user-info">User Info</Link>
        <Link to="logs" className="navbar-link">Logs</Link> {/* New Logs link */}
        <Link to="update-password" className="navbar-link">Update Password</Link>
        <button onClick={handleLogout} className="navbar-link logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
