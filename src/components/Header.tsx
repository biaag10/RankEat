import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';  // Caminho da imagem

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Controle do menu em telas móveis
  const navigate = useNavigate(); // Hook para redirecionamento

  return (
    <header className="bg-[#8A0500] flex justify-between items-center p-4 shadow-md w-full font-[Inter]">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-24 h-20 p-2 cursor-pointer"
          onClick={() => navigate('/App.tsx')} // Redireciona para Home ao clicar na logo
        />
      </div>

      <nav className="w-full flex items-center justify-end">
        <div className="text-white text-xl font-bold pr-4">
          SOBRE
        </div>

        {/* Ícone do menu para telas móveis */}
        <button
          className="text-[#ffffff] sm:hidden ml-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </nav>

      {/* Menu Mobile 
      {isOpen && (
        <div className="sm:hidden bg-[#8A0500] p-4 text-white">
          <ul>
            <li className="py-2 text-lg">Sobre</li>
          </ul>
        </div> 
      )} */}
    </header>
  );
};

export default Header;
