import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Import ไฟล์ CSS ที่ใช้ร่วมกัน

const Login = ({ onLogin, onToggleRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      onLogin();
    } catch (error) {
      console.error('There was an error logging in:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-logo">
          <img src="/logo-cite.jpg" alt="Logo" />
        </div>
        <div className="auth-name">
          <p style={{ margin: 0 }}>Chayaphon Suwanvorn</p>
          <p style={{ margin: 0, fontSize: "small" }}>College of Engineering and Technology</p>
          <p style={{ margin: 0, fontSize: "small" }}>Dhurakij Pundit University</p>
          <p style={{ margin: 0, fontSize: "small" }}>Advisor Asst.Prof. Dr.Chaiyaporn Khemapatapan</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="auth-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="auth-input"
        />
        <button type="submit" className="auth-button">Login</button>
      </form>
      <p>
        Don't have an account? <button onClick={onToggleRegister} className="auth-toggle-button">Register</button>
      </p>
    </div>
  );
};

export default Login;