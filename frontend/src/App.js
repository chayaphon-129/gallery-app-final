import React, { useState } from 'react';
import UnsplashGallery from './components/UnsplashGallery';
import Register from './components/Register';
import Login from './components/Login';
import './App.css'; // Import ไฟล์ CSS

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleRegister = () => {
    setIsRegistering(false);
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>UNSPLASH PHOTOS GALLERY</h1>
      </header>
      <main className="App-main">
        {!isAuthenticated ? (
          isRegistering ? (
            <Register onRegister={handleRegister} onToggleLogin={toggleRegister} />
          ) : (
            <Login onLogin={handleLogin} onToggleRegister={toggleRegister} />
          )
        ) : (
          <UnsplashGallery onLogout={handleLogout} />
        )}
      </main>
    </div>
  );
}

export default App;