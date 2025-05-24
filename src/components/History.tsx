import React, { useEffect, useState } from 'react';
import { fetchHistorico } from '../actions/index';
import { FaHistory } from 'react-icons/fa';

interface HistoryEntry {
  _id: string;
  cep: string;
  latitude: number;
  longitude: number;
  searchedAt: string;
}

interface HistoryProps {
  token: string;
}

const History: React.FC<HistoryProps> = ({ token }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async () => {
    try {
      const data = await fetchHistorico(token);

      if (Array.isArray(data)) {
        setHistory(data);
      } else {
        setError('Erro ao buscar histórico: dados inválidos.');
      }
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      setError('Erro ao buscar histórico');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [token]);

  if (loading) return <p className="text-center text-gray-600 mt-10">Carregando histórico...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (history.length === 0) return <p className="text-center text-gray-500 mt-10">Você não realizou buscas ainda.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-red-700">
        <FaHistory size={30} /> Histórico de Buscas
      </h2>
      <ul className="space-y-4">
        {history.map((entry) => (
          <li
            key={entry._id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition-shadow"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">CEP: <span className="text-red-600">{entry.cep}</span></p>
              <p className="text-sm text-gray-500">Latitude: {entry.latitude.toFixed(5)} | Longitude: {entry.longitude.toFixed(5)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Buscado em</p>
              <p className="text-gray-700 font-medium">{new Date(entry.searchedAt).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
