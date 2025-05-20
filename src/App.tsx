import './styles/main.css';
import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import SearchComponent from './components/SearchComponent';
import Favorites from './components/Favorites';
import History from './components/History';
import AboutSection from './components/AboutSection';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserId = localStorage.getItem('userId');
    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUserId(savedUserId);
    }
  }, []);

  const handleLoginSuccess = (token: string, userId: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setToken(token);
    setUserId(userId);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLogout={handleLogout} isLoggedIn={!!token} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          {!token ? (
            <>
              <Route
                path="/login"
                element={<Login onLoginSuccess={handleLoginSuccess} />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <SearchComponent
                    userId={userId!}
                    token={token}
                    apiKeyFoursquare="fsq3lB+7CQYRL4TDNQ0lkCOQ8Cb9fWpRXrYiWUSSvYlsysc="
                    apiKeyGeocoding="AIzaSyBJaZFuZvi8axZBiwxYeEumv4gMP0ti54o"
                  />
                }
              />
              <Route
                path="/favoritos"
                element={<Favorites userId={userId!} token={token} />}
              />
              <Route
                path="/historico"
                element={<History token={token} />}
              />
              <Route path="/sobre" element={<AboutSection />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
