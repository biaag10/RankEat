import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import { addComment, updateComment, uploadImage } from '../actions';
import { notifyError, notifySuccess } from './toasts/index';

const styles = {
  container: `max-w-3xl mx-auto bg-white rounded-lg p-6 shadow-lg mt-10`,
  heading: `text-center text-3xl font-bold text-[#8A0500] mb-8`,
  label: `block font-semibold mb-2 mt-6`,
  input: `w-full border-2 border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#8A0500]`,
  dishes: `mt-8`,
  dishCard: `flex gap-6 border border-gray-200 rounded-lg p-4 bg-[#fff8f6] mb-6 relative shadow-sm`,
  dishPhotoWrapper: `relative flex-shrink-0`,
  dishPhoto: `w-24 h-24 rounded-lg border-2 border-dashed border-[#8A0500] flex items-center justify-center cursor-pointer text-[#8A0500] font-bold text-xs select-none`,
  dishInfo: `flex-grow`,
  dishName: `w-fit bg-transparent border-none font-bold text-xl text-[#8A0500] mb-2 rounded focus:outline-none focus:ring-2 focus:ring-[#8A0500] p-1`,
  dishPrice: `w-fit bg-transparent border-none font-semibold text-gray-600 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#8A0500] p-1 mt-[-8px]`,
  commentBox: `w-full min-h-[60px] p-3 border border-gray-300 rounded-md resize-y text-sm font-sans`,
  starRating: `text-2xl select-none mb-3`,
  fileInput: `opacity-0 absolute inset-0 w-full h-full cursor-pointer`,
  removeBtn: `absolute top-2 right-2 bg-[#a6331f] hover:bg-[#8A0500] text-white rounded-full w-7 h-7 flex items-center justify-center text-xl font-bold cursor-pointer shadow`,
};

type Dish = {
  id: number;
  name: string;
  price: string;
  rating: number;
  comment: string;
  photoUrl: string | undefined;  
  fileObjectUrl?: string;
};


const CommentsForm: React.FC = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [dishes, setDishes] = useState<Dish[]>([]);
  const navigate = useNavigate(); // Inicializa o hook useNavigate
  const location = useLocation();
  const nextId = useRef(1);

  const { comment } = location.state || {}; // Recebe os dados do comentário quando redirecionado

  useEffect(() => {
    if (comment) {
      setRestaurantName(comment.restaurantName);
      setCuisineType(comment.cuisineType);
      setDishes(comment.dishes);
    }
  }, [comment]);

  const addDish = () => {
  setDishes((prev) => [
    ...prev,
    { id: nextId.current++, name: '', price: '', rating: 0, comment: '', photoUrl: undefined }, // Altere para undefined
  ]);
};


  const goToCommentHistory = () => {
    navigate('/historico-diario'); // Vai para a rota "/historico-diario"
  };

  const removeDish = () => {
    setDishes((prev) => prev.slice(0, -1));
  };

  const updateDish = (id: number, field: keyof Omit<Dish, 'id' | 'fileObjectUrl'>, value: string | number) => {
    setDishes((prev) =>
      prev.map((dish) =>
        dish.id === id
          ? {
              ...dish,
              [field]: value,
            }
          : dish
      )
    );
  };

  const handleFileChange = async (id: number, file: File | null) => {
    if (!file) return;

    try {
      // Fazer upload da imagem para o backend
      const uploadResult = await uploadImage(file);
      
      if (uploadResult.success) {
        // Usar a URL retornada pelo backend
        const imageUrl = `http://localhost:3000${uploadResult.imageUrl}`;
        
        setDishes((prev) =>
          prev.map((dish) => {
            if (dish.id === id) {
              // Limpar URL anterior se existir
              if (dish.fileObjectUrl) URL.revokeObjectURL(dish.fileObjectUrl);
              return { ...dish, photoUrl: imageUrl, fileObjectUrl: undefined };
            }
            return dish;
          })
        );
        
        notifySuccess('Imagem carregada com sucesso!');
      } else {
        notifyError('Erro ao carregar imagem. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no upload da imagem:', error);
      notifyError('Erro ao carregar imagem. Tente novamente.');
    }
  };

  const StarRating: React.FC<{
    rating: number;
    onChange: (rating: number) => void;
  }> = ({ rating, onChange }) => {
    return (
      <div className={styles.starRating} aria-label={`Avaliação: ${rating} estrelas`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{ color: star <= rating ? '#ffb400' : '#ccc', cursor: 'pointer' }}
            onClick={() => onChange(star)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onChange(star);
            }}
            tabIndex={0}
            role="button"
            aria-pressed={star <= rating}
            aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Função para salvar ou atualizar os comentários no backend
  const saveComment = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Você precisa estar logado para salvar um comentário');
    return;
  }

  const commentData = {
    restaurantName,
    cuisineType,
    dishes: dishes.map((dish) => ({
      ...dish,
      photoUrl: dish.photoUrl === null ? undefined : dish.photoUrl, // Garantir que null seja convertido para undefined
    })),
  };

  try {
    if (comment) {
      await updateComment(comment._id, commentData, token); // Atualiza o comentário
      console.log('Comentário atualizado:', commentData);
      notifySuccess('Comentário atualizado com sucesso!');
    } else {
      await addComment(commentData, token); // Cria um novo comentário
      notifySuccess('Comentário salvo com sucesso!');
    }

    setRestaurantName('');
    setCuisineType('');
    setDishes([]);
    navigate('/historico-diario'); // Redireciona para o histórico de comentários
  } catch (error) {
    console.error('Error saving comment:', error);
    notifyError('Erro ao salvar comentário. Preencha todas as informações e tente novamente.');
  }
};


  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{comment ? 'Editar Comentário' : 'Adicionar Comentário'}</h1>

      <label htmlFor="restaurant-name" className={styles.label}>Nome do Restaurante</label>
      <input
        id="restaurant-name"
        className={styles.input}
        type="text"
        placeholder="Digite o nome do restaurante"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
      />

      <label htmlFor="cuisine-type" className={styles.label}>Tipo de Cozinha</label>
      <input
        id="cuisine-type"
        className={styles.input}
        type="text"
        placeholder="Ex: Italiano, Japonês, Brasileiro"
        value={cuisineType}
        onChange={(e) => setCuisineType(e.target.value)}
      />

      <div className={styles.dishes}>
        {dishes.map((dish) => (
          <div key={dish.id} className={styles.dishCard}>
            <div className={styles.dishPhotoWrapper}>
              <label htmlFor={`file-input-${dish.id}`} className={styles.dishPhoto} title="Clique para adicionar foto">
                {dish.photoUrl ? '' : '+ Foto'}
                {dish.photoUrl && (
                  <img
                    src={dish.photoUrl}
                    alt={`Foto do prato ${dish.name || dish.id}`}
                    style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
                  />
                )}
              </label>
              <input
                id={`file-input-${dish.id}`}
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={(e) => handleFileChange(dish.id, e.target.files ? e.target.files[0] : null)}
              />
            </div>

            <div className={styles.dishInfo}>
              <input
                type="text"
                className={styles.dishName}
                placeholder="Nome do prato"
                value={dish.name}
                onChange={(e) => updateDish(dish.id, 'name', e.target.value)}
              />
              <input
                type="text"
                className={styles.dishPrice}
                placeholder="Preço (ex: R$ 35,00)"
                value={dish.price}
                onChange={(e) => updateDish(dish.id, 'price', e.target.value)}
              />
              <StarRating rating={dish.rating} onChange={(rating) => updateDish(dish.id, 'rating', rating)} />
              <textarea
                className={styles.commentBox}
                placeholder="Comentário sobre o prato..."
                value={dish.comment}
                onChange={(e) => updateDish(dish.id, 'comment', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-6"> {/* Main container for all buttons, centered vertically */}
        <div className="flex flex-wrap justify-center gap-4 mb-4"> {/* Row for "Adicionar", "Remover", "Salvar" */} 
          <button className="bg-[#8A0500] text-white font-bold py-2 px-6 rounded-md cursor-pointer hover:bg-[#a6331f] transition whitespace-nowrap" type="button" onClick={addDish}>
            Adicionar Novo Prato
          </button>
          <button
            className="bg-[#8A0500] text-white font-bold py-2 px-6 rounded-md cursor-pointer hover:bg-[#a6331f] transition whitespace-nowrap" 
            type="button"
            onClick={removeDish}
            disabled={dishes.length === 0}
            aria-disabled={dishes.length === 0}
          >
            Remover Prato
          </button>
          <button className="bg-[#8A0500] text-white font-bold py-2 px-6 rounded-md cursor-pointer hover:bg-[#a6331f] transition whitespace-nowrap" type="button" onClick={saveComment}>
            {comment ? 'Atualizar Comentário' : 'Salvar Comentário'}
          </button>
        </div>

        <button
          className="bg-[#8A0500] text-white font-bold py-2 px-6 rounded-md cursor-pointer hover:bg-[#a6331f] transition whitespace-nowrap"
          type="button"
          onClick={goToCommentHistory}
        >
          Acessar Histórico de Comentários
        </button>
      </div>
    </div>
  );
};

export default CommentsForm;


