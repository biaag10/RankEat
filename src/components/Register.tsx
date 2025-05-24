import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../actions';
import { notifyError, notifySuccess } from '../components/toasts/index';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // estado para toggle de visibilidade da senha

  const navigate = useNavigate();

  // Função para validar senha
  const isPasswordValid = (pwd: string) => {
    const minLength = /.{8,}/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    return minLength.test(pwd) && hasNumber.test(pwd) && hasSpecialChar.test(pwd);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid(password)) {
      notifyError('Senha deve ter pelo menos 8 caracteres, incluir número e caractere especial.');
      return;
    }

    try {
      await registerUser(name, username, email, password);

      notifySuccess('Registro concluído com sucesso! Redirecionando para login...');

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      if (err instanceof Error) {
        notifyError(err.message || 'Erro inesperado ao registrar');
      } else {
        notifyError('Erro inesperado ao registrar');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#8A0500]">Registrar</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        {/* Mensagem de padrão de senha abaixo */}
        <p className="text-xs text-gray-600 italic">
          A senha deve ter pelo menos 8 caracteres, incluir pelo menos um número e um caractere especial.
        </p>

        <button
          type="submit"
          className="bg-[#8A0500] text-white py-2 rounded hover:bg-red-700 transition"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
