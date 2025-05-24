import React, { useEffect, useState } from 'react';
import { fetchFavoritos, removeFavorito } from '../actions/index';
import { notifyError, notifySuccess } from '../components/toasts/index';
import { FaStar } from 'react-icons/fa';

interface Favorite {
  _id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantLocation: string;
  addedAt: string;
}

interface FavoritesProps {
  userId: string;
  token: string;
}

const Favorites: React.FC<FavoritesProps> = ({ userId, token }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await fetchFavoritos(userId, token);
      setFavorites(data);
    } catch (error) {
      notifyError('Erro ao buscar favoritos.');
      console.error('Erro ao buscar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (restaurantId: string) => {
    if (removingId) return;

    try {
      setRemovingId(restaurantId);
      await removeFavorito(userId, restaurantId, token);
      notifySuccess('Restaurante removido dos favoritos!');
      setFavorites((prev) => prev.filter((fav) => fav.restaurantId !== restaurantId));
    } catch (error) {
      notifyError('Erro ao remover favorito.');
      console.error('Erro ao remover favorito:', error);
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) return <p>Carregando favoritos...</p>;
  if (favorites.length === 0) return <p>Você não tem restaurantes favoritos.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-4 flex items-center gap-3 text-red-700">
        <FaStar size={36} className="text-yellow-400" />
        Você favoritou {favorites.length} restaurante{favorites.length > 1 ? 's' : ''}
      </h1>

      <h2 className="text-3xl font-bold mb-6">Seus Favoritos</h2>
      <ul className="space-y-4">
        {favorites.map((fav) => (
          <li key={fav._id} className="border p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{fav.restaurantName}</h3>
              <p>{fav.restaurantLocation}</p>
              <p className="text-sm text-gray-600">
                Adicionado em: {new Date(fav.addedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleRemove(fav.restaurantId)}
              disabled={removingId === fav.restaurantId}
              className="ml-4 bg-[#8A0500] text-white px-2 py-1 rounded hover:bg-red-700 disabled:opacity-50"
            >
              {removingId === fav.restaurantId ? 'Removendo...' : 'Remover'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
