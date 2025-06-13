import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ProfileForm from './components/ProfileForm';
import NavBar from './components/NavBar';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      {isAuthenticated && <NavBar onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/profile" /> : <LoginPage onLogin={() => setIsAuthenticated(true)} />
        } />

        <Route path="/profile" element={
          isAuthenticated ? <ProfileForm onSubmitSuccess={() => alert("Submitted Successfully!")} /> : <Navigate to="/login" />
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
