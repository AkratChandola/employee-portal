

import React from 'react';
import NavBar from './components/NavBar';
import ProfileForm from './components/ProfileForm';

function App() {
  const handleLogout = () => {
    // e.g. clear auth, redirect to login
    alert('Logged out!');
  };

  return (
    <>
      <NavBar onLogout={handleLogout} />
      <ProfileForm />
    </>
  );
}

export default App;
