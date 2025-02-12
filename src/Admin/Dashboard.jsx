import React from "react";
import { Routes, Route } from "react-router-dom";
import Roles from "../Admin/Roles";
import Data from "../Admin/Data";
import UserInfo from "../Admin/UserInfo";
import Navbar from "../Admin/Navbar";
import UpdatePassword from "../Admin/UpdatePassword";
import LogsPage from "./LogsPage";
import "../Admin/Dashboard.css"; // Ensure the file path is correct.

const Dashboard = () => (
  <div className="dashboard-container">
    <Navbar />
    <div className="content-container">
      <Routes>
        <Route path="roles" element={<Roles />} />
        <Route path="data" element={<Data />} />
        <Route path="user-info" element={<UserInfo />} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="logs" element={<LogsPage />} />
      </Routes>
    </div>
  </div>
);

export default Dashboard;
