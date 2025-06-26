import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaStar, FaRegCommentDots, FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { buscarCoordenadasPorCep, buscarRestaurantes, addFavorito, removeFavorito, addHistorico, fetchFavoritos } from '../actions';
import { notifyError, notifySuccess } from '../components/toasts/index';

interface Restaurante {
  fsq_id: string;
  name: string;
  location: { address: string };
  categories: { name: string }[];
  distance: number;
  geocodes?: { main?: { latitude: number; longitude: number } };
}

interface Favorito {
  restaurantId: string;
}

interface SearchRestaurantsProps {
  userId: string;
  token: string;
}

const SearchRestaurants: React.FC<SearchRestaurantsProps> = ({ userId, token }) => {
  const [cep, setCep] = useState<string>(localStorage.getItem('cep') || '');
  const [restaurants, setRestaurants] = useState<Restaurante[]>(() => {
    const storedRestaurants = localStorage.getItem('restaurants');
    return storedRestaurants ? JSON.parse(storedRestaurants) : [];
  });
  const [allRestaurants, setAllRestaurants] = useState<Restaurante[]>(() => {
    const storedRestaurants = localStorage.getItem('restaurants');
    return storedRestaurants ? JSON.parse(storedRestaurants) : [];
  });
  const [error, setError] = useState<string>('');
  const [cepError, setCepError] = useState<string>('');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [sliderValue, setSliderValue] = useState<number>(() => {
    return Number(localStorage.getItem('sliderValue')) || 5;
  });
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const navigate = useNavigate();

  // Função para limpar a busca
  const limparBusca = () => {
    setRestaurants([]);
    setAllRestaurants([]);
    setSliderValue(5);
    localStorage.removeItem('restaurants');
    localStorage.setItem('sliderValue', '5');
  };

  const formatarCep = (inputCep: string) => {
    const apenasNumeros = inputCep.replace(/\D/g, '');
    if (apenasNumeros.length <= 5) {
      return apenasNumeros;
    }
    return `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5, 8)}`;
  };

  const validarCep = (inputCep: string) => {
    const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
    if (!cepRegex.test(inputCep)) {
      setCepError('O CEP deve estar no formato correto (XXXXX-XXX).');
      return false;
    }
    setCepError('');
    return true;
  };

  const atualizarFavoritos = async () => {
    try {
      const favoritos: Favorito[] = await fetchFavoritos(userId, token);
      const favIds = new Set(favoritos.map((fav) => fav.restaurantId));
      setFavoriteIds(favIds);
    } catch (err) {
      console.error('Erro ao buscar favoritos:', err);
      notifyError('Erro ao carregar favoritos');
    }
  };

  // Função que faz a requisição para o back-end buscar coordenadas
  const buscarCoordenadasErestaurantes = async () => {
    setIsSearching(true);
    setError('');
    if (!cep) {
      notifyError('Por favor, insira o CEP.');
      setIsSearching(false);
      return;
    }
    if (!validarCep(cep)) {
      setIsSearching(false);
      return;
    }

    setSliderValue(5);
    localStorage.setItem('sliderValue', '5');

    try {
      const { latitude, longitude } = await buscarCoordenadasPorCep(cep);
      // Chama a função para buscar restaurantes
      const restaurantsData = await buscarRestaurantes(latitude, longitude);
      setAllRestaurants(restaurantsData);
      setRestaurants(restaurantsData.slice(0, sliderValue));
      await addHistorico({ cep, latitude, longitude, userId }, token);
      await atualizarFavoritos();
    } catch (error) {
      console.error('Erro ao buscar coordenadas ou restaurantes:', error);
      notifyError('Ocorreu um erro ao buscar o CEP ou os restaurantes.');
    } finally {
      setIsSearching(false);
    }
  };

  const toggleFavorite = async (restaurant: Restaurante) => {
    const isFav = favoriteIds.has(restaurant.fsq_id);

    try {
      if (isFav) {
        await removeFavorito(userId, restaurant.fsq_id, token);
        setFavoriteIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(restaurant.fsq_id);
          return newSet;
        });
        notifySuccess('Restaurante removido dos favoritos');
      } else {
        await addFavorito(
          {
            userId,
            restaurantId: restaurant.fsq_id,
            restaurantName: restaurant.name,
            restaurantLocation: restaurant.location.address,
          },
          token
        );
        setFavoriteIds((prev) => new Set(prev).add(restaurant.fsq_id));
        notifySuccess('Restaurante adicionado aos favoritos.');
      }
    } catch (error) {
      console.error('Erro ao alterar favorito:', error);
      notifyError('Erro ao alterar favorito');
    }
  };

  // Atualizar restaurantes exibidos quando o slider muda
  useEffect(() => {
    if (allRestaurants.length > 0) {
      const slicedRestaurants = allRestaurants.slice(0, sliderValue);
      setRestaurants(slicedRestaurants);
      localStorage.setItem('sliderValue', sliderValue.toString());
    }
  }, [sliderValue, allRestaurants]);

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
          onChange={(e) => {
            const formattedCep = formatarCep(e.target.value);
            setCep(formattedCep);
            localStorage.setItem('cep', formattedCep);
          }}
          placeholder="Ex: 01001-000"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        {cepError && <div className="text-red-500 text-sm mb-4">{cepError}</div>}

        <div className="flex gap-2">
          <button
            onClick={buscarCoordenadasErestaurantes} // Chama a função de buscar coordenadas do CEP
            disabled={isSearching}
            className={`flex-1 p-2 text-white rounded-md transition-colors flex items-center justify-center ${
              isSearching
                ? 'bg-red-600 cursor-not-allowed'
                : allRestaurants.length > 0
                ? 'bg-orange-600 hover:bg-orange-700'
                : 'bg-red-700 hover:bg-red-600'
            }`}
          >
            {isSearching ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Buscando...
              </>
            ) : allRestaurants.length > 0 ? (
              <>
                <FaSearch className="mr-2" />
                Nova Busca
              </>
            ) : (
              <>
                <FaSearch className="mr-2" />
                Buscar Restaurantes
              </>
            )}
          </button>

          {allRestaurants.length > 0 && (
            <button
              onClick={limparBusca}
              className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex items-center justify-center"
              title="Limpar busca"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {error && <div className="mt-4 text-red-500">{error}</div>}

      <div className="mt-6 w-full max-w-md">
        <label htmlFor="maxRestaurants" className="block text-lg mb-2">
          Número máximo de restaurantes:
        </label>
        <div className="flex justify-between items-center mb-4">
          <span>1</span>
          <input
            type="range"
            min="1"
            max="20"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full mx-2 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer transition-all duration-300 ease-in-out"
            style={{
              background: `linear-gradient(to right, #f87171 ${((sliderValue - 1) / 19) * 100}%, #d1d5db ${((sliderValue - 1) / 19) * 100}%)`,
            }}
          />
          <span>20</span>
        </div>
        <div className="text-center text-lg mt-2">Exibindo {sliderValue} Restaurantes</div>
      </div>

      <div id="results" className="mt-6 w-full max-w-md">
        {restaurants.length > 0 ? (
          <div className="space-y-4">
            {restaurants.map((restaurant) => {
              const lat = restaurant.geocodes?.main?.latitude;
              const lng = restaurant.geocodes?.main?.longitude;
              const mapsUrl = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : '#';
              const isFav = favoriteIds.has(restaurant.fsq_id);

              return (
                <div
                  key={restaurant.fsq_id}
                  className="group p-4 bg-white rounded-md shadow-md border-2 border-red-600 hover:shadow-red-600 transition-all duration-300 flex justify-between items-center"
                >
                  <div>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-semibold hover:underline"
                    >
                      {restaurant.name}
                    </a>
                    <p><strong>Endereço:</strong> {restaurant.location.address || 'Não disponível'}</p>
                    <p><strong>Categoria:</strong> {restaurant.categories ? restaurant.categories.map((cat) => cat.name).join(', ') : 'Não disponível'}</p>
                    <p><strong>Distância:</strong> {(restaurant.distance / 1000).toFixed(2)} km</p>
                  </div>

                  <div className="flex flex-col items-center gap-6">
                    <FaMapMarkerAlt
                      className="text-red-600 transition-transform duration-300 hover:scale-110"
                      size={24}
                    />

                    <button
                      aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      onClick={() => toggleFavorite(restaurant)}
                      className="focus:outline-none hover:scale-110 hover:shadow-lg transition-all duration-300"
                    >
                      <FaStar size={24} className={isFav ? 'text-yellow-400' : 'text-gray-400'} />
                    </button>

                    <button
                      aria-label="Comentar"
                      onClick={() =>
                        navigate(`/comentarios/${restaurant.fsq_id}`, {
                          state: { restaurantName: restaurant.name },
                        })
                      }
                      className="text-blue-600 hover:text-blue-800 hover:scale-110 hover:shadow-lg transition-colors duration-300"
                      title="Comentar"
                    >
                      <FaRegCommentDots size={22} />
                    </button>
                  </div>
                </div>
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
