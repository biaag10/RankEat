import React, { useState } from 'react';
import Header from './componentes/Header';
import './App.css';

const App: React.FC = () => {
  const [cep, setCep] = useState<string>('');
  const [logradouro, setLogradouro] = useState<string>('');
  const [bairro, setBairro] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [estado, setEstado] = useState<string>('');
  const [restaurantes, setRestaurantes] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value);
  };

  const fetchAddress = async () => {
    if (cep.length !== 8) {
      setError('CEP deve ter 8 caracteres');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado');
        setLogradouro('');
        setBairro('');
        setCidade('');
        setEstado('');
      } else {
        setLogradouro(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setEstado(data.uf);
        setError('');
        // Buscar restaurantes após o CEP válido
        fetchRestaurants(data);
      }
    } catch (error) {
      setError('Erro ao buscar endereço');
    }
  };

  const fetchRestaurants = async (data: any) => {
    setLoading(true);

    try {
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${data.logradouro},${data.bairro},${data.localidade},${data.uf}&key=AIzaSyBk9Wnjn1TOr9dJeAkNWUcwaiiCwBSSGxM`
      );
      const geocodeData = await geocodeResponse.json();
      const location = geocodeData.results[0]?.geometry.location;

      if (location) {
        const { lat, lng } = location;
        const placesResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&key=AIzaSyBk9Wnjn1TOr9dJeAkNWUcwaiiCwBSSGxM`
        );
        const placesData = await placesResponse.json();
        setRestaurantes(placesData.results);
      } else {
        setError('Não foi possível obter as coordenadas do endereço');
      }
    } catch (error) {
      setError('Erro ao buscar restaurantes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAddress();
  };

  return (
    <>
    

    <div className="App">
      
      <h1>Consulta de CEP e Restaurantes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={handleCepChange}
          maxLength={8}
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p className="error">{error}</p>}

      {logradouro && (
        <div className="address-info">
          <p><strong>Rua:</strong> {logradouro}</p>
          <p><strong>Bairro:</strong> {bairro}</p>
          <p><strong>Cidade:</strong> {cidade}</p>
          <p><strong>Estado:</strong> {estado}</p>
        </div>
      )}

      {loading && <p>Carregando restaurantes...</p>}

      <div className="restaurant-list">
        {restaurantes.length > 0 ? (
          restaurantes.map((restaurant: any, index: number) => (
            <div className="restaurant-card" key={index}>
              <h4>{restaurant.name}</h4>
              <p>{restaurant.vicinity}</p>
            </div>
          ))
        ) : (
          !loading && <p>Nenhum restaurante encontrado.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default App;
