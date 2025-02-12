import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarStudent.css'; 

const NavbarStudent = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login'; // Redirect to login after logout
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="user-info">User Info</Link> {/* Relative path */}
        </li>
        <li>
          <Link to="update-password">Update Password</Link> {/* Relative path */}
        </li>
        <li>
          <button onClick={handleLogout} className="navbar-link logout">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarStudent;
