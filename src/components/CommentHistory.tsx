import React, { useEffect, useState, useCallback } from 'react';
import { FaEdit, FaTrash, FaSearch, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteComment, searchComments } from '../actions/index';

interface Dish {
  name: string;
  price: string;
  rating: number;
  comment: string;
  photoUrl: string;
}

interface Comment {
  _id: string;
  restaurantName: string;
  cuisineType: string;
  dishes: Dish[];
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt?: string;
}

interface CommentHistoryProps {
  token: string;
}

const CommentHistory: React.FC<CommentHistoryProps> = ({ token }) => {
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const loadAndFilterComments = useCallback(async () => {
    if (!searchTerm.trim()) {
      setFilteredComments([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await searchComments(token, searchTerm);
      setFilteredComments(data);
    } catch (err) {
      console.error('Erro ao carregar/filtrar comentários:', err);
      setError('Erro ao carregar/filtrar comentários.');
    } finally {
      setLoading(false);
    }
  }, [token, searchTerm]);

  useEffect(() => {
    loadAndFilterComments();
  }, [loadAndFilterComments]);

  const clearFilter = () => {
    setSearchTerm('');
  };

  const handleEditComment = (comment: Comment) => {
    navigate('/diario', { state: { comment } });
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Tem certeza que deseja excluir este comentário?')) return;

    try {
      await deleteComment(commentId, token);
      loadAndFilterComments(); 
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const truncateText = (text: string, maxLength: number = 60) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#8A0500] hover:text-[#6B0400] transition-colors"
            title="Voltar"
          >
            <FaArrowLeft size={20} />
          </button>
          
          <div className="relative flex-1 max-w-md mx-4">
            <input
              type="text"
              placeholder="Busque por Filtro"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8A0500] focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            {searchTerm && (
              <button
                onClick={clearFilter}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          
          <div className="w-8"></div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#8A0500]">Histórico de Comentários</h2>

        {loading && (
          <div className="text-center text-gray-600 mt-10">Carregando histórico de comentários...</div>
        )}

        {error && (
          <div className="text-center text-red-600 mt-10">{error}</div>
        )}

        {!loading && !error && searchTerm.trim() === '' && (
          <div className="text-center text-gray-500 mt-10">Digite algo no filtro para buscar comentários.</div>
        )}

        {!loading && !error && searchTerm.trim() !== '' && filteredComments.length === 0 && (
          <div className="mb-4 text-sm text-gray-600">
            Nenhum resultado encontrado para "{searchTerm}"
          </div>
        )}

        {!loading && !error && searchTerm.trim() !== '' && filteredComments.length > 0 && (
          <div className="mb-4 text-sm text-gray-600">
            {filteredComments.length} resultado(s) encontrado(s) para "{searchTerm}"
          </div>
        )}

        <div className="space-y-4">
          {!loading && !error && filteredComments.map(comment => (
            <div
              key={comment._id}
              className="border border-gray-300 rounded-lg p-4 bg-white hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleEditComment(comment)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">{comment.restaurantName}</h3>
                  <p className="text-gray-600 text-sm mb-2">{truncateText(comment.comment)}</p>
                  <p className="text-gray-600 text-sm mb-2">Tipo de Cozinha: {comment.cuisineType}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleEditComment(comment);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Editar comentário"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleDeleteComment(comment._id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Excluir comentário"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>

              {comment.dishes.map((dish, index) => (
                <div key={index} className="border-t pt-4 mt-4">
                  <h4 className="font-semibold text-gray-800">Prato: {dish.name}</h4>
                  <p className="text-gray-600 text-sm">Comentário: {dish.comment}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">Preço:</span>
                    <span className="text-gray-600">{dish.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStars(dish.rating)}
                    <span className="text-sm text-gray-500">({dish.rating}/5)</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentHistory;


