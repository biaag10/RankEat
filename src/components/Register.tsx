import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importando o useNavigate para navegação

import { registerUser } from '../actions'; // Importa a função registerUser

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const navigate = useNavigate();  // Função para navegação

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    try {
      // Chamando a função registerUser para registrar o usuário
      const result = await registerUser(name, username, email, password);
      
      // Caso o registro seja bem-sucedido
      setSuccessMsg('Registro concluído com sucesso! Faça login.');
      console.log('Registro bem-sucedido:', result);

      // Redireciona o usuário para a tela de login após o registro
      setTimeout(() => {
        navigate('/login');  // Redireciona para a página de login
      }, 1500);  
    } catch (err) {
      // Aqui vamos garantir que o erro seja tratado de forma mais específica
      if (err instanceof Error) {
        setError(err.message || 'Erro inesperado ao registrar');
      } else {
        setError('Erro inesperado ao registrar');
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
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />
        
        {/* Exibe a mensagem de erro se houver */}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        
        {/* Exibe a mensagem de sucesso após o registro */}
        {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
        
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
