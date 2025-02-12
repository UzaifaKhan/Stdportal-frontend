import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavbarStudent from '../Student/NavbarStudent'; // Import the student navbar
import UserInfoStudent from '../Student/UserInfoStudent'; // Ensure this path is correct
import UpdatePassword from '../Student/UpdatePasswordStudent'; // Ensure this path is correct
import '../Student/DashboardStudent.css';

const DashboardStudent = () => (
  <div className="dashboard-container">
    <NavbarStudent /> {/* Use NavbarStudent here */}
    <div className="content-container">
      <Routes>
        <Route path="user-info" element={<UserInfoStudent />} />
        <Route path="update-password" element={<UpdatePassword />} />
      </Routes>
    </div>
  </div>
);

export default DashboardStudent;
