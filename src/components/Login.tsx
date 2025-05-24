import React, { useState } from 'react';
import { loginUser } from '../actions/index'; 
import { notifyError, notifySuccess } from '../components/toasts/index'; 

interface LoginProps {
  onLoginSuccess: (token: string, userId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // estado para toggle de visibilidade da senha

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await loginUser(emailOrUsername, password);

    if (result.success && result.token && result.userId) {
      notifySuccess('Login realizado com sucesso!');
      onLoginSuccess(result.token, result.userId);
    } else {
      notifyError(result.message || 'Falha no login');
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
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        {/* Checkbox para mostrar/ocultar senha */}
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="accent-red-600"
          />
          Mostrar senha
        </label>

        <button
          type="submit"
          className="bg-[#8A0500] text-white p-2 rounded hover:bg-red-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
