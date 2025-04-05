'use client';

import { useState } from "react";
import BarraPesquisa from "@/components/BarraPesquisa";  // Barra de pesquisa para CEP/Bairro
import { getCoordenadas } from "@/lib/google";  // Função para API ViaCEP

export default function HomePage() {
  const [endereco, setEndereco] = useState<any>(null);  // Para armazenar o endereço
  const [loading, setLoading] = useState(false);

  const handleSearch = async (address: string) => {
    try {
      setLoading(true);
      // Buscando o endereço usando o CEP ou bairro
      const { logradouro, bairro, cidade, estado } = await getCoordenadas(address);
      setEndereco({ logradouro, bairro, cidade, estado });
    } catch (err) {
      alert("Erro ao buscar endereço");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-4">📍 Buscar Endereço</h1>
      <BarraPesquisa onSearch={handleSearch} />

      {/* Exibindo o endereço encontrado */}
      {loading ? (
        <p className="text-center mt-4">Carregando...</p>
      ) : (
        endereco && (
          <div className="p-4">
            <h3>Endereço encontrado:</h3>
            <p><strong>Rua:</strong> {endereco.logradouro}</p>
            <p><strong>Bairro:</strong> {endereco.bairro}</p>
            <p><strong>Cidade:</strong> {endereco.cidade}</p>
            <p><strong>Estado:</strong> {endereco.estado}</p>
          </div>
        )
      )}
    </main>
  );
}
