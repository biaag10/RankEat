import React, { useEffect, useState } from 'react';
import { fetchHistorico } from '../actions/index';

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

      // Verificar se data é realmente um array
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

  if (loading) return <p>Carregando histórico...</p>;
  if (error) return <p>{error}</p>;
  if (history.length === 0) return <p>Você não realizou buscas ainda.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Histórico de Buscas</h2>
      <ul className="list-disc list-inside space-y-2">
        {history.map((entry) => (
          <li key={entry._id}>
            CEP: <strong>{entry.cep}</strong> — Data: {new Date(entry.searchedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
