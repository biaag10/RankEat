import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate
import { fetchComments, deleteComment } from '../actions/index';

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
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Inicializando o useNavigate

  // Carregar comentários
  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const commentsData = await fetchComments(token); // Carrega os comentários do backend

        // Log para depuração
        console.log('Resposta da API:', commentsData);

        // Verifica se a resposta contém um array na chave "comments"
        if (Array.isArray(commentsData.comments)) {
          setComments(commentsData.comments); // Atualiza o estado com os comentários
        } else {
          throw new Error('A resposta da API não contém um array de comentários');
        }
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
        setError('Erro ao carregar comentários');
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [token]);

  // Função para editar o comentário
  const handleEditComment = (comment: Comment) => {
    // Redireciona para a tela de criação de comentário passando os dados
    navigate('/diario', { state: { comment } }); // Aqui redirecionamos para a rota '/create-comment' passando o estado com o comentário
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Tem certeza que deseja excluir este comentário?')) return;

    try {
      await deleteComment(commentId, token); // Exclui o comentário no backend
      setComments(prev => prev.filter(comment => comment._id !== commentId)); // Remove localmente
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center text-gray-600 mt-10">Carregando histórico de comentários...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center text-red-600 mt-10">{error}</div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center text-gray-500 mt-10">Você ainda não fez nenhum comentário.</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-[#8A0500]">Histórico de Comentários</h2>

        <div className="space-y-4">
          {comments.map(comment => (
            <div
              key={comment._id}
              className="border border-gray-300 rounded-lg p-4 bg-white hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleEditComment(comment)} // Ao clicar, edita o comentário
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

              {/* Exibir os pratos */}
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
