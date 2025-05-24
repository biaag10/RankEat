import React, { useState } from 'react';
import { loginUser } from '../actions/index'; // ajuste o caminho conforme seu projeto

interface LoginProps {
  onLoginSuccess: (token: string, userId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // NOVO

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true); // ativa loading
    const result = await loginUser(emailOrUsername, password);
    setLoading(false); // desativa loading

    if (result.success && result.token && result.userId) {
      onLoginSuccess(result.token, result.userId);
    } else {
      setError(result.message || 'Falha no login');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#8A0500]">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="E-mail ou nome de usuário"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          required
          disabled={loading} // opcional: desabilita input durante loading
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          required
          disabled={loading} // opcional
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading} // DESABILITA BOTÃO durante loading
          className="bg-[#8A0500] text-white p-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
