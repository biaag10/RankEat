import './styles/main.css';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import logo from './assets/logo.png';

// Componente de Pesquisa de CEP
const SearchComponent = () => {
  const [cep, setCep] = useState(''); // Estado para armazenar o CEP

  const handleSearch = () => {
    console.log('Buscando CEP:', cep);
    // Aqui você pode fazer a lógica de busca com o CEP
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-[90%] sm:w-[700px] h-[120px] relative bg-white shadow-lg rounded-md overflow-hidden flex items-center justify-between p-2">
        {/* Campo de busca */}
        <input
          type="text"
          className="w-[85%] h-12 px-4 text-xl font-bold border-2 rounded-md focus:outline-none"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)} // Atualiza o estado com o valor do CEP
        />
        
        {/* Botão de pesquisa */}
        <button
          onClick={handleSearch}
          className="w-24 h-12 bg-red-800 text-white text-xl font-black rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
};

// Componente de Lista de Restaurantes
const RestaurantList = () => {
  const restaurants = [
    { name: 'Restaurante de Full Stack', distance: 'XXXX m', rating: 5.0 },
    { name: 'Restaurante de Pedrinho', distance: 'XXXX m', rating: 4.8 },
    { name: 'Restaurante de Bia', distance: 'XXXX m', rating: 4.7 },
    { name: 'Restaurante de Juju', distance: 'XXXX m', rating: 4.6 },
    { name: 'Restaurante de ATH', distance: 'XXXX m', rating: 4.5 },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center mt-6">
      {restaurants.map((restaurant, index) => (
        <div key={index} className="w-[90%] sm:w-[700px] bg-white rounded-md shadow-md mb-4 p-4 border-2 border-red-600 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="https://placehold.co/40x40" alt="Location Icon" className="w-6 h-6" />
            <div className="text-lg font-bold">{restaurant.name}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-md">{restaurant.distance}</div>
            <div className="text-yellow-500">{'★'.repeat(Math.round(restaurant.rating))}</div>
            <div className="text-md">{restaurant.rating}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false); // Controle do menu em telas móveis
  const navigate = useNavigate(); // Hook para redirecionamento

  return (
    <>
      {/* Cabeçalho */}
      <header className="bg-[#8A0500] flex justify-between items-center p-4 shadow-md w-full font-[Inter]">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-20 p-2 cursor-pointer"
            onClick={() => navigate('/')} // Redireciona para Home ao clicar na logo
          />
        </div>

        {/* Navbar */}
        <nav className="w-full flex items-center justify-end">
          {/* Campo de texto "Sobre" */}
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
      </header>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="sm:hidden bg-[#8A0500] p-4 text-white">
          <ul>
            <li className="py-2 text-lg">Sobre</li>
            {/* Outros itens de navegação para dispositivos móveis podem ser adicionados aqui */}
          </ul>
        </div>
      )}

      {/* Componente de Pesquisa de CEP */}
      <SearchComponent />

      {/* Lista de Restaurantes */}
      <RestaurantList />
    </>
  );
}

export default App;
