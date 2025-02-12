import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavbarManager from '../Manager/NavbarManager'; // Correct the import path if needed
import DataManager from '../Manager/DataManager'; // Ensure this path is correct
import UserInfoManager from '../Manager/UserInfoManager'; // Ensure this path is correct
import UpdatePasswordManager from '../Manager/UpdatePasswordManager'; // Ensure this path is correct
import '../Manager/DashboardManager.css';

const DashboardManager = () => (
  <div className="dashboard-container">
    <NavbarManager /> {/* Use NavbarManager here */}
    <div className="content-container">
      <Routes>
        {/* Define the correct relative routes */}
        <Route path="data" element={<DataManager />} />
        <Route path="user-info" element={<UserInfoManager />} />
        <Route path="update-password" element={<UpdatePasswordManager />} />
      </Routes>
    </div>
  </div>
);

export default DashboardManager;
