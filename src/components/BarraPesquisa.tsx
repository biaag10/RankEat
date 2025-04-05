"use client";

import { useState } from "react";

interface Props {
  onSearch: (address: string) => void;
}

export default function BarraPesquisa({ onSearch }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite um CEP ou Bairro"
        className="border rounded p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Buscar
      </button>
    </form>
  );
}
