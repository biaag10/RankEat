import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/main.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import SearchComponent from './components/SearchComponent';
import Favorites from './components/Favorites';
import History from './components/History';
import AboutSection from './components/AboutSection';

function App() {
  console.log('App renderizado');

  const [loadingAuth, setLoadingAuth] = useState(true); // controla carregamento auth
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  console.log('Estado inicial: token:', token, ', userId:', userId, ', loadingAuth:', loadingAuth);

  useEffect(() => {
    console.log('useEffect: começando a carregar token e userId do localStorage...');
    const savedToken = localStorage.getItem('token');
    const savedUserId = localStorage.getItem('userId');

    console.log('useEffect: token do localStorage:', savedToken);
    console.log('useEffect: userId do localStorage:', savedUserId);

    if (savedToken && savedUserId) {
      console.log('useEffect: token e userId encontrados, atualizando estado...');
      setToken(savedToken);
      setUserId(savedUserId);
    } else {
      console.log('useEffect: nenhum token ou userId encontrado');
    }

    setLoadingAuth(false);
    console.log('useEffect: carregamento auth finalizado, loadingAuth setado para false');
  }, []);

  const handleLoginSuccess = (newToken: string, newUserId: string) => {
    console.log('handleLoginSuccess: login bem-sucedido');
    console.log('handleLoginSuccess: salvando token e userId no localStorage...');
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', newUserId);
    console.log('handleLoginSuccess: token salvo:', newToken);
    console.log('handleLoginSuccess: userId salvo:', newUserId);

    setToken(newToken);
    setUserId(newUserId);
  };

  const handleLogout = () => {
    console.log('handleLogout: limpando localStorage e estado...');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
  };

  console.log('Render final: token:', token, ', userId:', userId, ', loadingAuth:', loadingAuth);

  if (loadingAuth) {
    console.log('Renderizando loadingAuth...');
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Carregando autenticação...</p>
      </div>
    );
  }

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
              <Route 
              path="/register" 
              element={<Register />} />
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
