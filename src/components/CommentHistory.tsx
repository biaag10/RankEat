import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

interface Comment {
  _id: string;
  restaurantName: string;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt?: string;
}

interface CommentHistoryProps {
  token: string;
  userId: string;
}

const CommentHistory: React.FC<CommentHistoryProps> = ({ token, userId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(0);

  // Mock data para demonstração - em produção, isso viria do backend
  const mockComments: Comment[] = [
    {
      _id: '1',
      restaurantName: 'Restaurante exemplo',
      comment: 'O restaurante possui um ambiente agradável, atendimento rápido e eficaz.',
      rating: 4,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    },
    {
      _id: '2',
      restaurantName: 'Restaurante2 exemplo',
      comment: 'O restaurante possui um ambiente agradável, atendimento rápido e eficaz.',
      rating: 5,
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-14T14:20:00Z'
    },
    {
      _id: '3',
      restaurantName: 'Restaurante3 exemplo',
      comment: 'O restaurante possui um ambiente agradável, atendimento rápido e eficaz.',
      rating: 3,
      createdAt: '2024-01-13T16:45:00Z',
      updatedAt: '2024-01-13T16:45:00Z'
    },
    {
      _id: '4',
      restaurantName: 'Restaurante4 exemplo',
      comment: 'O restaurante possui um ambiente agradável, atendimento rápido e eficaz.',
      rating: 4,
      createdAt: '2024-01-12T12:15:00Z',
      updatedAt: '2024-01-12T12:15:00Z'
    },
    {
      _id: '5',
      restaurantName: 'Restaurante5 exemplo',
      comment: 'O restaurante possui um ambiente agradável, atendimento rápido e eficaz.',
      rating: 5,
      createdAt: '2024-01-11T09:30:00Z',
      updatedAt: '2024-01-11T09:30:00Z'
    },
    {
      _id: '6',
      restaurantName: 'Restaurante6 exemplo',
      comment: 'O restaurante possui um ambiente agradável, atendimento rápido e eficaz.',
      rating: 2,
      createdAt: '2024-01-10T18:00:00Z',
      updatedAt: '2024-01-10T18:00:00Z'
    }
  ];

  useEffect(() => {
    // Simular carregamento dos dados
    const loadComments = async () => {
      try {
        setLoading(true);
        // Em produção, aqui seria feita a chamada para o backend
        // const response = await fetch(`/api/comments/user/${userId}`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // const data = await response.json();
        
        // Simulando delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        setComments(mockComments);
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
        setError('Erro ao carregar comentários');
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [token, userId]);

  const handleViewComment = (comment: Comment) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment);
    setEditText(comment.comment);
    setEditRating(comment.rating);
  };

  const handleSaveEdit = async () => {
    if (!editingComment) return;

    try {
      // Em produção, aqui seria feita a chamada para o backend
      // await fetch(`/api/comments/${editingComment._id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     comment: editText,
      //     rating: editRating
      //   })
      // });

      // Atualizar localmente para demonstração
      setComments(prev => prev.map(comment => 
        comment._id === editingComment._id 
          ? { ...comment, comment: editText, rating: editRating, updatedAt: new Date().toISOString() }
          : comment
      ));

      setEditingComment(null);
      setEditText('');
      setEditRating(0);
    } catch (error) {
      console.error('Erro ao editar comentário:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Tem certeza que deseja excluir este comentário?')) return;

    try {
      // Em produção, aqui seria feita a chamada para o backend
      // await fetch(`/api/comments/${commentId}`, {
      //   method: 'DELETE',
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      // Remover localmente para demonstração
      setComments(prev => prev.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  const truncateText = (text: string, maxLength: number = 60) => {
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
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="border border-gray-300 rounded-lg p-4 bg-white hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleViewComment(comment)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">{comment.restaurantName}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {truncateText(comment.comment)}
                  </p>
                  <div className="flex items-center gap-2">
                    {renderStars(comment.rating)}
                    <span className="text-sm text-gray-500">
                      ({comment.rating}/5)
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditComment(comment);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Editar comentário"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={(e) => {
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
            </div>
          ))}
        </div>
      </div>

      {/* Modal para visualizar comentário completo */}
      {isModalOpen && selectedComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#8A0500]">{selectedComment.restaurantName}</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(selectedComment.rating)}
                  <span className="text-sm text-gray-500">
                    ({selectedComment.rating}/5)
                  </span>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  {selectedComment.comment}
                </p>
                
                <div className="text-sm text-gray-500">
                  <p>Comentário feito em: {new Date(selectedComment.createdAt).toLocaleString('pt-BR')}</p>
                  {selectedComment.updatedAt && selectedComment.updatedAt !== selectedComment.createdAt && (
                    <p>Última edição: {new Date(selectedComment.updatedAt).toLocaleString('pt-BR')}</p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    handleEditComment(selectedComment);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <FaEdit size={14} />
                  Editar
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    handleDeleteComment(selectedComment._id);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <FaTrash size={14} />
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar comentário */}
      {editingComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#8A0500]">Editar Comentário</h3>
                <button
                  onClick={() => {
                    setEditingComment(null);
                    setEditText('');
                    setEditRating(0);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">{editingComment.restaurantName}</h4>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avaliação:
                  </label>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setEditRating(index + 1)}
                        className={`text-2xl ${index < editRating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comentário:
                  </label>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A0500] focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Digite seu comentário..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setEditingComment(null);
                    setEditText('');
                    setEditRating(0);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-[#8A0500] text-white rounded-lg hover:bg-[#6d0400] transition-colors"
                  disabled={!editText.trim() || editRating === 0}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentHistory;

