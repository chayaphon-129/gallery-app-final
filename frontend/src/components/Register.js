import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Import ไฟล์ CSS ที่ใช้ร่วมกัน

const Register = ({ onRegister, onToggleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // สถานะสำหรับข้อความแจ้งเตือน

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      alert('User registered successfully');
      onRegister(); // เรียกใช้ฟังก์ชันเพื่อเปลี่ยนหน้า
    } catch (error) {
      console.error('There was an error registering the user:', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // ตั้งค่าข้อความแจ้งเตือนจากเซิร์ฟเวอร์
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
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
        <h2>Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* แสดงข้อความแจ้งเตือน */}
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
        <button type="submit" className="auth-button">Register</button>
      </form>
      <p>
        Already have an account? <button onClick={onToggleLogin} className="auth-toggle-button">Login</button>
      </p>
    </div>
  );
};

export default Register;