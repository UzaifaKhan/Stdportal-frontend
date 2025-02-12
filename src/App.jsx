import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Admin/Dashboard';
import DashboardManager from './Manager/DashboardManager';
import DashboardStudent from './Student/DashboardStudent';
import { AdminProvider } from './Components/AdminContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(''); // Track the user's role

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Assuming you store the user's role here
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role); // Set the user role from localStorage
    }
  }, []);

  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          
          {/* Admin dashboard */}
          <Route
            path="/dashboard/*"
            element={isAuthenticated && userRole === 'Admin' ? <Dashboard /> : <Navigate to="/Dashboard" replace />}
          />
          
          {/* Manager dashboard */}
          <Route
            path="/dashboard-manager/*" // Make sure to use /* for nested routes
            element={isAuthenticated && userRole === 'Manager' ? <DashboardManager /> : <Navigate to="/DashboardManager" replace />}
          />
          
          {/* Student dashboard */}
          <Route
            path="/dashboard-student/*" // Same for student
            element={isAuthenticated && userRole === 'User ' ? <DashboardStudent /> : <Navigate to="/DashboardStudent" replace />}
          />
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
