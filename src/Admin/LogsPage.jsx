import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch logs when the component mounts
    axios.get('https://localhost:44369/api/logs/all')
      .then(response => {
        setLogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching logs:', error);
      });
  }, []);

  return (
    <div className="logs-container">
      <h1>All Logs</h1>
      <table>
        <thead>
          <tr>
            <th>Message</th>
            <th>IP Address</th>
            <th>Device Info</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="message">{log.message}</td>
              <td className="ipAddress">{log.ipAddress}</td>
              <td className="deviceInfo">{log.deviceInfo}</td>
              <td className="createdAt">{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsPage;
