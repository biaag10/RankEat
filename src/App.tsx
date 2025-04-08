// src/App.tsx

import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [cep, setCep] = useState('');
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  const apiKeyFoursquare = 'fsq3lB+7CQYRL4TDNQ0lkCOQ8Cb9fWpRXrYiWUSSvYlsysc='; // Sua chave da Foursquare API

  const buscarRestaurantesPorCep = async () => {
    if (!cep) {
      alert('Por favor, insira o CEP.');
      return;
    }

    try {
      // Converte o CEP em coordenadas com a OpenStreetMap (Nominatim)
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?postalcode=${cep}&format=json`);
      const data = response.data;

      if (data.length > 0) {
        const latitude = data[0].lat;
        const longitude = data[0].lon;
        buscarRestaurantes(latitude, longitude);
      } else {
        setError('Não foi possível encontrar as coordenadas para esse CEP.');
      }
    } catch (error) {
      console.error('Erro ao buscar coordenadas do CEP:', error);
      setError('Ocorreu um erro ao buscar o CEP.');
    }
  };

  const buscarRestaurantes = async (latitude: string, longitude: string) => {
    try {
      const response = await axios.get(`https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&radius=1000&limit=5&categories=13065`, {
        headers: {
          'Authorization': apiKeyFoursquare
        }
      });

      if (response.data.results.length > 0) {
        setRestaurants(response.data.results);
      } else {
        setRestaurants([]);
        setError('Nenhum restaurante encontrado nas proximidades.');
      }
    } catch (error) {
      console.error('Erro ao buscar restaurantes:', error);
      setError('Ocorreu um erro ao buscar os restaurantes.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Buscar Restaurantes por CEP</h1>

      <div className="w-full max-w-md">
        <label htmlFor="cep" className="block text-lg mb-2">Digite o CEP:</label>
        <input
          type="text"
          id="cep"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Ex: 01001000"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <button
          onClick={buscarRestaurantesPorCep}
          className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Buscar Restaurantes
        </button>
      </div>

      {error && <div className="mt-4 text-red-500">{error}</div>}

      <div id="results" className="mt-6 w-full max-w-md">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div key={restaurant.fsq_id} className="p-4 bg-white rounded-md shadow-md mb-4">
              <h3 className="text-xl font-semibold">{restaurant.name}</h3>
              <p><strong>Endereço:</strong> {restaurant.location.address || 'Não disponível'}</p>
              <p><strong>Categoria:</strong> {restaurant.categories ? restaurant.categories.map((cat: any) => cat.name).join(', ') : 'Não disponível'}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhum restaurante encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default App;
