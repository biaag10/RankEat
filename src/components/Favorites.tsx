import React, { useEffect, useState } from 'react';
import { fetchFavoritos } from '../actions/index'; 

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

  const loadFavorites = async () => {
    try {
      const data = await fetchFavoritos(userId, token);
      setFavorites(data);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  if (loading) return <p>Carregando favoritos...</p>;
  if (favorites.length === 0) return <p>Você não tem restaurantes favoritos.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Seus Favoritos</h2>
      <ul className="space-y-4">
        {favorites.map((fav) => (
          <li key={fav._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{fav.restaurantName}</h3>
            <p>{fav.restaurantLocation}</p>
            <p className="text-sm text-gray-600">Adicionado em: {new Date(fav.addedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
