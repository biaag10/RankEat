import { useState } from 'react';

const SearchComponent = () => {
  const [cep, setCep] = useState(''); // Estado para armazenar o CEP

  const handleSearch = () => {
    console.log('Buscando CEP:', cep);
    // Aqui você pode fazer a lógica de busca com o CEP
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-[90%] sm:w-[700px] h-[120px] relative bg-white shadow-lg rounded-md overflow-hidden flex items-center justify-between p-2">
        <input
          type="text"
          className="w-[85%] h-12 px-4 text-xl font-bold border-2 rounded-md focus:outline-none"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)} // Atualiza o estado com o valor do CEP
        />
        
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

export default SearchComponent;
