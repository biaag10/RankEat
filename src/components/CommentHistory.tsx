import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSearch, FaArrowLeft } from 'react-icons/fa';
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
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate(); // Inicializando o useNavigate

  // Carregar comentários
  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        
        // Dados mockados para demonstração da funcionalidade de filtro
        const mockComments = [
          {
            _id: '1',
            restaurantName: 'McDonald\'s',
            cuisineType: 'Fast Food',
            dishes: [
              {
                name: 'Big Mac',
                price: 'R$ 25,90',
                rating: 4,
                comment: 'Hambúrguer clássico muito saboroso',
                photoUrl: ''
              }
            ],
            rating: 4,
            comment: 'Ótimo hambúrguer, atendimento rápido',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z'
          },
          {
            _id: '2',
            restaurantName: 'Burger King',
            cuisineType: 'Fast Food',
            dishes: [
              {
                name: 'Whopper',
                price: 'R$ 28,90',
                rating: 5,
                comment: 'Melhor hambúrguer da cidade',
                photoUrl: ''
              }
            ],
            rating: 5,
            comment: 'Excelente qualidade, hambúrguer muito bem preparado',
            createdAt: '2024-01-20T14:15:00Z',
            updatedAt: '2024-01-20T14:15:00Z'
          },
          {
            _id: '3',
            restaurantName: 'Pizzaria Bella',
            cuisineType: 'Italiana',
            dishes: [
              {
                name: 'Pizza Margherita',
                price: 'R$ 45,00',
                rating: 5,
                comment: 'Pizza tradicional italiana perfeita',
                photoUrl: ''
              }
            ],
            rating: 5,
            comment: 'Ambiente aconchegante, pizza deliciosa',
            createdAt: '2024-01-25T19:45:00Z',
            updatedAt: '2024-01-25T19:45:00Z'
          },
          {
            _id: '4',
            restaurantName: 'Sushi House',
            cuisineType: 'Japonesa',
            dishes: [
              {
                name: 'Combo Sashimi',
                price: 'R$ 65,00',
                rating: 4,
                comment: 'Peixe fresco, muito bem preparado',
                photoUrl: ''
              }
            ],
            rating: 4,
            comment: 'Comida japonesa autêntica, ambiente tranquilo',
            createdAt: '2024-02-01T20:30:00Z',
            updatedAt: '2024-02-01T20:30:00Z'
          },
          {
            _id: '5',
            restaurantName: 'Churrascaria Gaúcha',
            cuisineType: 'Brasileira',
            dishes: [
              {
                name: 'Picanha',
                price: 'R$ 89,90',
                rating: 5,
                comment: 'Carne de primeira qualidade',
                photoUrl: ''
              }
            ],
            rating: 5,
            comment: 'Churrasco tradicional, carnes excelentes',
            createdAt: '2024-02-05T13:00:00Z',
            updatedAt: '2024-02-05T13:00:00Z'
          }
        ];

        setComments(mockComments);
        setFilteredComments(mockComments);
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
        setError('Erro ao carregar comentários');
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [token]);

  // Filtrar comentários baseado no termo de busca
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredComments(comments);
    } else {
      const filtered = comments.filter(comment => {
        // Busca no nome do restaurante
        const restaurantMatch = comment.restaurantName.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Busca no tipo de cozinha
        const cuisineMatch = comment.cuisineType.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Busca no comentário geral
        const commentMatch = comment.comment?.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Busca nos pratos
        const dishMatch = comment.dishes.some(dish => 
          dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dish.comment.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        return restaurantMatch || cuisineMatch || commentMatch || dishMatch;
      });
      setFilteredComments(filtered);
    }
  }, [searchTerm, comments]);

  // Função para limpar o filtro
  const clearFilter = () => {
    setSearchTerm('');
  };

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
        {/* Botão de voltar e campo de busca */}
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
          
          <div className="w-8"></div> {/* Espaçador para balancear o layout */}
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#8A0500]">Histórico de Comentários</h2>

        {/* Mostrar resultado da busca */}
        {searchTerm && (
          <div className="mb-4 text-sm text-gray-600">
            {filteredComments.length === 0 
              ? `Nenhum resultado encontrado para "${searchTerm}"`
              : `${filteredComments.length} resultado(s) encontrado(s) para "${searchTerm}"`
            }
          </div>
        )}

        <div className="space-y-4">
          {filteredComments.map(comment => (
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
