import React, { useState } from 'react';
import { loginUser } from '../actions/index'; // ajuste o caminho conforme seu projeto

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
    const result = await loginUser(emailOrUsername, password);

    if (result.success && result.token && result.userId) {
      onLoginSuccess(result.token, result.userId);
    } else {
      setError(result.message || 'Falha no login');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-20">
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="E-mail ou nome de usuário"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-red-700 text-white p-2 rounded hover:bg-red-600"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
