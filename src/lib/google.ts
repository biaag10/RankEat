// lib/google.ts

import axios from 'axios';

interface ViaCEPResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    erro?: boolean;  // Para tratar o caso de erro
  }

// Função para obter o endereço a partir do CEP usando a API ViaCEP
export async function getCoordenadas(address: string) {
  try {
    // Definindo que a resposta será do tipo ViaCEPResponse
    const response = await axios.get<ViaCEPResponse>(`https://viacep.com.br/ws/${address}/json/`);
    const data = response.data;

    // Verificando se houve erro na resposta da API
    if (data.erro) {
      throw new Error("CEP não encontrado");
    }

    // Retornando o endereço completo
    return {
      logradouro: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf,
    };
  } catch (error) {
    console.error('Erro ao buscar o endereço:', error);
    throw new Error('Erro ao buscar o endereço.');
  }
}
