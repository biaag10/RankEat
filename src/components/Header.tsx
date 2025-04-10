import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const Header = () => {
  const navigate = useNavigate(); 

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
      <button
        onClick={() => {
          const section = document.getElementById('sobre');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="text-white text-xl font-bold pr-4 cursor-pointer hover:text-red-300 transition-colors">SOBRE
      </button>
      </nav>
    </header>
  );
};

export default Header;
