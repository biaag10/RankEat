// LOGIN

import axios from "axios";

export const loginUser = async (emailOrUsername: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3000/users/login', {  // Alterado para localhost
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: emailOrUsername, password }), // pode ser email ou username
    });

    const data = await response.json();

    if (response.ok) {
      // Salvar token e userId no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      return { success: true, token: data.token, userId: data.userId };
    } else {
      return { success: false, message: data.message || 'Login failed. Please try again.' };
    }
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
};


// REGISTRO

export const registerUser = async (name: string, username: string, email: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3000/users/register', {  // Alterado para localhost
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error registering user');
    }

    return await response.json();  // Retorna a resposta do servidor
  } catch (error: unknown) {  // Aqui especificamos 'unknown' para o tipo de erro
    if (error instanceof Error) {
      throw new Error(error.message || 'An unexpected error occurred');  // Agora podemos acessar error.message
    } else {
      throw new Error('An unexpected error occurred');  // Caso o erro não seja uma instância de Error
    }
  }
};

// FAVORITOS

export const fetchFavoritos = async (userId: string, token: string) => {
  try {
    const response = await fetch(`http://localhost:3000/favorites/${userId}`, {  // Alterado para localhost
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao buscar favoritos');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao buscar favoritos');
    } else {
      throw new Error('Erro inesperado ao buscar favoritos');
    }
  }
};

export const addFavorito = async (
  favoritoData: {
    userId: string;
    restaurantId: string;
    restaurantName: string;
    restaurantLocation: string;
  },
  token: string
) => {
  try {
    const response = await fetch(`http://localhost:3000/favorites`, {  // Alterado para localhost
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(favoritoData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao adicionar favorito');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao adicionar favorito');
    } else {
      throw new Error('Erro inesperado ao adicionar favorito');
    }
  }
};

export const removeFavorito = async (
  userId: string,
  restaurantId: string,
  token: string
) => {
  try {
    const response = await fetch(`http://localhost:3000/favorites/${userId}/${restaurantId}`, {  // Alterado para localhost
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao remover favorito');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao remover favorito');
    } else {
      throw new Error('Erro inesperado ao remover favorito');
    }
  }
};

// HISTÓRICO

export const fetchHistorico = async (token: string, limit = 10) => {
  try {
    const response = await fetch(`http://localhost:3000/search-history?limit=${limit}`, {  // Alterado para localhost
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao buscar histórico');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao buscar histórico');
    } else {
      throw new Error('Erro inesperado ao buscar histórico');
    }
  }
};

export const addHistorico = async (
  buscaData: {
    cep: string;
    latitude: number;
    longitude: number;
    userId?: string;
    ipAddress?: string;
  },
  token: string
) => {
  try {
    const response = await fetch(`http://localhost:3000/search-history`, {  // Alterado para localhost
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(buscaData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao adicionar histórico');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao adicionar histórico');
    } else {
      throw new Error('Erro inesperado ao adicionar histórico');
    }
  }
};

// UPLOAD DE IMAGEM

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('http://localhost:3000/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao fazer upload da imagem');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao fazer upload da imagem');
    } else {
      throw new Error('Erro inesperado ao fazer upload da imagem');
    }
  }
};

// COMENTÁRIOS

export const addComment = async (
  commentData: {
    restaurantName: string;
    cuisineType: string;
    dishes: {
      name: string;
      price: string;
      rating: number;
      comment: string;
      photoUrl?: string;
    }[]; 
  },
  token: string
) => {
  try {
    const response = await fetch('http://localhost:3000/comments/create', {  // Alterado para localhost
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao salvar comentário');
    }

    return await response.json(); // Retorna o comentário salvo
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao salvar comentário');
    } else {
      throw new Error('Erro inesperado ao salvar comentário');
    }
  }
};

export const fetchComments = async (token: string, limit = 10) => {
  try {
    const response = await fetch(`http://localhost:3000/comments/list?limit=${limit}`, {  // Alterado para localhost
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao buscar comentários');
    }

    return await response.json(); // Retorna a lista de comentários
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao buscar comentários');
    } else {
      throw new Error('Erro inesperado ao buscar comentários');
    }
  }
};

export const updateComment = async (
  commentId: string,
  updatedCommentData: {
    restaurantName: string;
    cuisineType: string;
    dishes: {
      name: string;
      price: string;
      rating: number;
      comment: string;
      photoUrl?: string;
    }[]; 
  },
  token: string
) => {
  try {
    const response = await fetch(`http://localhost:3000/comments/update/${commentId}`, {  // Alterado para localhost
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedCommentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao editar comentário');
    }

    return await response.json(); // Retorna o comentário atualizado
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao editar comentário');
    } else {
      throw new Error('Erro inesperado ao editar comentário');
    }
  }
};

export const deleteComment = async (commentId: string, token: string) => {
  try {
    const response = await fetch(`http://localhost:3000/comments/delete/${commentId}`, {  // Alterado para localhost
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao excluir comentário');
    }

    return await response.json(); // Retorna a confirmação de que o comentário foi deletado
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao excluir comentário');
    } else {
      throw new Error('Erro inesperado ao excluir comentário');
    }
  }
};

// BUSCA DE COMENTÁRIOS COM FILTRO

export const searchComments = async (token: string, searchTerm: string, limit = 10) => {
  try {
    const response = await fetch(`http://localhost:3000/comments/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}`, {  // Alterado para localhost
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao buscar comentários');
    }

    return await response.json(); // Retorna a lista de comentários filtrados
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao buscar comentários');
    } else {
      throw new Error('Erro inesperado ao buscar comentários');
    }
  }
};

// Buscar coordenadas de um CEP
export const buscarCoordenadasPorCep = async (cep: string) => {
  try {
    const response = await axios.get('http://localhost:3000/geocode', {
      params: { cep },
    });
    return response.data; // Retorna latitude e longitude
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Erro ao buscar coordenadas do CEP.');
  }
};

// Buscar restaurantes utilizando as coordenadas (latitude e longitude)
export const buscarRestaurantes = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get('http://localhost:3000/restaurants', {
      params: { latitude, longitude },
    });
    return response.data.results; // Retorna a lista de restaurantes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Erro ao buscar restaurantes.');
  }
};