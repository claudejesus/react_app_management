import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FarmerDashboard = () => {
  const [data, setData] = useState([]);

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

  return (
    <div className="dashboard">
      <h2>Farmer Dashboard</h2>
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

export default FarmerDashboard;
