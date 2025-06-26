import ToastContainer from './components/toasts/ToastProvider';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/main.css';
import { notifySuccess } from './components/toasts/index';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import SearchComponent from './components/SearchComponent';
import Favorites from './components/Favorites';
import History from './components/History';
import AboutSection from './components/AboutSection';
import CommentsForm from './components/CommentsForm'; 
import CommentHistory from './components/CommentHistory';

function App() {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Verifica se o token está expirado
    const checkTokenExpiration = () => {
      const savedToken = localStorage.getItem('token');
      const savedUserId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration'); // Hora de expiração do token

      if (savedToken && savedUserId && tokenExpiration) {
        const currentTime = Date.now();

        // Verifica se o token expirou
        if (currentTime > parseInt(tokenExpiration)) {
          // Token expirado
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('tokenExpiration');
          setToken(null);
          setUserId(null);
          notifySuccess('Sua sessão expirou. Faça login novamente.');
        } else {
          // Token válido
          setToken(savedToken);
          setUserId(savedUserId);
        }
      } else {
        setToken(null);
        setUserId(null);
      }

      setLoadingAuth(false);
    };

    checkTokenExpiration();
  }, []);

  const handleLoginSuccess = (newToken: string, newUserId: string) => {
    // Salva o token e a data de expiração (1 hora a partir de agora)
    const expirationTime = Date.now() + 3600000; // 1 hora em milissegundos
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', newUserId);
    localStorage.setItem('tokenExpiration', expirationTime.toString());

    setToken(newToken);
    setUserId(newUserId);
  };

  const handleLogout = () => {
    notifySuccess('Você foi deslogado com sucesso!');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    setToken(null);
    setUserId(null);
  };

  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Carregando autenticação...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
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
                element={<SearchComponent userId={userId!} token={token} />}
              />
              <Route
                path="/favoritos"
                element={<Favorites userId={userId!} token={token} />}
              />
              <Route path="/historico" element={<History token={token} />} />
              <Route path="/sobre" element={<AboutSection />} />
              <Route path="/diario" element={<CommentsForm />} />
              <Route path="/historico-diario" element={<CommentHistory token={token} />} />
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
