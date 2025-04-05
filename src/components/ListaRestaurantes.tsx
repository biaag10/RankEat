
interface Restaurante {
    nome: string;
    avaliacao: number;
    total_avaliacoes: number;
    localizacao: string;
  }
  
  interface Props {
    restaurantes: Restaurante[];
  }
  
  export default function ListaRestaurantes({ restaurantes }: Props) {
    return (
      <div className="p-4">
        {restaurantes.length === 0 ? (
          <p className="text-center">Nenhum restaurante encontrado.</p>
        ) : (
          <ul className="space-y-4">
            {restaurantes.map((r, i) => (
              <li key={i} className="border rounded p-4 shadow">
                <h3 className="text-lg font-bold">{r.nome}</h3>
                <p>⭐ {r.avaliacao} ({r.total_avaliacoes} avaliações)</p>
                <p>{r.localizacao}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  