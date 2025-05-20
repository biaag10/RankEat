import React, { useState } from 'react';
import { loginUser } from '../actions';

interface LoginProps {
  onLoginSuccess: (token: string, userId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await loginUser(emailOrUsername, password);
      if (result.success) {
        const token = localStorage.getItem('token') || '';
        // Pega userId do token ou backend (aqui placeholder '')
        onLoginSuccess(token, '');
      } else {
        setError(result.message || 'Falha no login');
      }
    } catch {
      setError('Erro inesperado ao tentar logar');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#8A0500]">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Email ou nome de usuário"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-[#8A0500] text-white py-2 rounded hover:bg-red-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
