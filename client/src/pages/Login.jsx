import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('farmer');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // NOTE: Add real login/auth logic here
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/farmer');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="farmer">Farmer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
