import React, { useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';

// Tipos específicos para a resposta da API
interface Restaurante {
  fsq_id: string;
  name: string;
  location: {
    address: string;
  };
  categories: { name: string }[];
  distance: number;
  geocodes?: {
    main?: {
      latitude: number;
      longitude: number;
    };
  };
}

const SearchRestaurants: React.FC = () => {
  const [cep, setCep] = useState<string>('');
  const [restaurants, setRestaurants] = useState<Restaurante[]>([]);
  const [error, setError] = useState<string>('');
  const [cepError, setCepError] = useState<string>('');

  const apiKeyFoursquare = 'fsq3lB+7CQYRL4TDNQ0lkCOQ8Cb9fWpRXrYiWUSSvYlsysc='; // Foursquare API
  const apiKeyGeocoding = 'AIzaSyBJaZFuZvi8axZBiwxYeEumv4gMP0ti54o'; // Google Geocoding API

  const validarCep = (inputCep: string) => {
    const cepRegex = /^[0-9]{8}$/;
    if (!cepRegex.test(inputCep)) {
      if (inputCep.length < 8) {
        setCepError('O CEP deve conter 8 dígitos.');
      } else {
        setCepError('O CEP deve conter apenas números.');
      }
      return false;
    }
    setCepError('');
    return true;
  };

  const buscarRestaurantesPorCep = async () => {
    setError('');
    setRestaurants([]);

    if (!cep) {
      alert('Por favor, insira o CEP.');
      return;
    }

    if (!validarCep(cep)) {
      return;
    }

    try {
      const geocodingEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${apiKeyGeocoding}`;
      const geocodingResponse = await axios.get(geocodingEndpoint);
      const data = geocodingResponse.data;

      if (data.status === 'OK' && data.results.length > 0) {
        const latitude = data.results[0].geometry.location.lat;
        const longitude = data.results[0].geometry.location.lng;
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
      const endpoint = `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&radius=1000&limit=5&categories=13065`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: apiKeyFoursquare,
        },
      });

      if (response.data.results.length > 0) {
        setRestaurants(response.data.results);
        setError('');
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
    <div className="min-h-screen flex flex-col items-center justify-center p-5">
      <h1 className="text-3xl font-bold mb-4">Buscar Restaurantes por CEP</h1>

      <div className="w-full max-w-md">
        <label htmlFor="cep" className="block text-lg mb-2">
          Digite o CEP:
        </label>
        <input
          type="text"
          id="cep"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Ex: 01001000"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        {cepError && <div className="text-red-500 text-sm mb-4">{cepError}</div>}

        <button
          onClick={buscarRestaurantesPorCep}
          className="w-full p-2 bg-red-700 text-white rounded-md hover:bg-red-600"
        >
          Buscar Restaurantes
        </button>
      </div>

      {error && <div className="mt-4 text-red-500">{error}</div>}

      <div id="results" className="mt-6 w-full max-w-md">
        {restaurants.length > 0 ? (
          <div className="space-y-4">
            {restaurants.map((restaurant: Restaurante) => {
              const lat = restaurant.geocodes?.main?.latitude;
              const lng = restaurant.geocodes?.main?.longitude;
              const mapsUrl = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : '#';

              return (
                <a
                  key={restaurant.fsq_id}
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 bg-white rounded-md shadow-md border-2 border-red-600 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                    <FaMapMarkerAlt className="text-red-600 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1" />
                    </div>
                  <p><strong>Endereço:</strong> {restaurant.location.address || 'Não disponível'}</p>
                  <p><strong>Categoria:</strong> {restaurant.categories ? restaurant.categories.map((cat) => cat.name).join(', ') : 'Não disponível'}</p>
                  <p><strong>Distância:</strong> {(restaurant.distance / 1000).toFixed(2)} km</p>
                </a>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">Faça uma busca!</p>
        )}
      </div>
    </div>
  );
};

export default SearchRestaurants;
