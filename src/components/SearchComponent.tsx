import React, { useEffect, useState } from 'react';
import { notifySuccess, notifyError } from './toasts';
import pulseiraImage from '../assets/pulseira.png';
import esculturaMadeira from '../assets/pecaArtesao.png';
import quadroBordado from '../assets/quadroBordado.png';
import cestaPalha from '../assets/cestaPalha.png';
import colarPedras from '../assets/colarPedras.png';
import vasoCeramica from '../assets/vasoCeramica.png';
import bolsaCouro from '../assets/bolsaCouro.png';
import caminhoMesa from '../assets/caminhoMesa.png';
import mantaLa from '../assets/mantaLa.png';
import portaRetrato from '../assets/portaRetrato.png';

const mockProducts = [
  {
    _id: '1',
    name: 'Pulseira Artesanal',
    description: 'Feita à mão com miçangas coloridas. Adicione um toque único ao seu look!',
    price: 25,
    image: pulseiraImage,
    author: 'João da Silva',
    contact: 'joao@artesao.com',
  },
  {
    _id: '2',
    name: 'Escultura em Madeira',
    description: 'Peça única esculpida por artesão local. Perfeita para decoração.',
    price: 120,
    image: esculturaMadeira,
    author: 'Maria Souza',
    contact: 'maria.souza@artesao.com',
  },
  {
    _id: '3',
    name: 'Quadro Bordado',
    description: 'Arte decorativa feita com ponto cruz. Um toque de arte manual para sua parede.',
    price: 80,
    image: quadroBordado,
    author: 'Carlos Pereira',
    contact: 'carlos@bordados.com',
  },
  {
    _id: '4',
    name: 'Cesta de Palha',
    description: 'Cesta artesanal de palha, ideal para organizar sua casa com estilo.',
    price: 45,
    image: cestaPalha,
    author: 'Ana Costa',
    contact: 'ana@costasartesanato.com',
  },
{
    _id: '5',
    name: 'Colar de Pedras Naturais',
    description: 'Colar único feito com pedras naturais, trazendo beleza e harmonia.',
    price: 65,
    image: colarPedras,
    author: 'Lucas Almeida',
    contact: 'lucas@pedrasnaturais.com',
  },
  {
    _id: '6',
    name: 'Vaso de Cerâmica',
    description: 'Vaso artesanal de cerâmica, ideal para decorar sua sala ou jardim.',
    price: 95,
    image: vasoCeramica,
    author: 'Fernanda Lima',
    contact: 'fernanda@ceramicas.com',
  },
  {
    _id: '7',
    name: 'Bolsa de Couro Artesanal',
    description: 'Bolsa exclusiva feita de couro, com acabamento artesanal e único.',
    price: 180,
    image: bolsaCouro,
    author: 'Rafael Martins',
    contact: 'rafael@bolsacouro.com',
  },
  {
    _id: '8',
    name: 'Caminho de Mesa Bordado',
    description: 'Caminho de mesa feito à mão com bordado delicado, para deixar sua mesa ainda mais bonita.',
    price: 50,
    image: caminhoMesa,
    author: 'Juliana Santos',
    contact: 'juliana@bordados.com',
  },
  {
    _id: '9',
    name: 'Manta de Lã',
    description: 'Manta artesanal feita de lã natural, para aquecer seus dias com estilo.',
    price: 110,
    image: mantaLa,
    author: 'Paulo Rocha',
    contact: 'paulo@lanafina.com',
  },
  {
    _id: '10',
    name: 'Porta-Retrato de Madeira',
    description: 'Porta-retrato rústico de madeira para guardar suas melhores memórias.',
    price: 30,
    image: portaRetrato,
    author: 'Cláudia Oliveira',
    contact: 'claudia@portaretrato.com',
  },
];



const SearchComponent = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const load = async () => {
      setTimeout(() => {
        setProducts(mockProducts);
        setLoading(false);
      }, 500);
    };
    load();
  }, []);

  const handleAdd = (productId: string) => {
    const product = mockProducts.find((p) => p._id === productId);

    if (product) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingProduct = cart.find((item: any) => item._id === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      notifySuccess('Produto adicionado ao carrinho!');
    } else {
      notifyError('Produto não encontrado');
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl text-gray-700">Carregando catálogo...</div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto mb-6">
        <input
          className="w-full border border-gray-300 rounded px-4 py-2 shadow focus:outline-none focus:ring focus:border-red-600"
          placeholder="Buscar produtos..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div key={p._id} className="bg-white border rounded shadow p-4 flex flex-col items-center">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover mb-3 rounded"
              />
              <h3 className="font-bold text-lg text-center">{p.name}</h3>
              <p className="text-sm text-gray-600 text-center">{p.description}</p>
              <p className="font-semibold text-red-700 mt-2">R$ {p.price}</p>

              <div className="mt-3 text-center">
                <p className="text-sm text-gray-500">{p.author}</p>
                <p className="text-xs text-gray-400">{p.contact}</p>
              </div>

              <button
                onClick={() => handleAdd(p._id)}
                className="mt-3 px-4 py-2 bg-[#8A0500] text-white rounded hover:bg-red-700 transition"
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
