import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [action, setAction] = useState('');

  useEffect(() => {
    fetchSensorData();
  }, []);

  const fetchSensorData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/sensors');
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch sensor data', err);
    }
  };

  const handleControl = async (cmd) => {
    try {
      await axios.post('http://localhost:5000/api/sensors/control', { action: cmd });
      setAction(`Sent command: ${cmd}`);
    } catch (err) {
      console.error('Control command failed', err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={() => handleControl('fan_on')}>Turn Fan ON</button>
      <button onClick={() => handleControl('fan_off')}>Turn Fan OFF</button>
      <p>{action}</p>

      <h3>Sensor Data</h3>
      <table>
        <thead>
          <tr>
            <th>Temperature (°C)</th>
            <th>Humidity (%)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.temperature}</td>
              <td>{d.humidity}</td>
              <td>{new Date(d.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
