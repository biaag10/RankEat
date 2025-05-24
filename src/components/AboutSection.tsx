import ideiasImg from '../assets/ideias.jpeg';
import cozinhandoImg from '../assets/cozinhando.jpg';
import equipeImg from '../assets/equipe.jpg';
import quemSomosImg from '../assets/quemsomos.png';

import developer1 from '../assets/Pedro.png';   
import developer2 from '../assets/Rafael.png';  
import developer3 from '../assets/Julia.png';  
import developer4 from '../assets/Bia.png';  

const MainContentCards = () => {
  return (
    <section className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1: Ideias */}
      <div className="bg-white rounded-lg shadow-xl shadow-red-300 p-6 text-gray-900 flex flex-col">
        <img src={ideiasImg} alt="Ideias" className="w-full h-40 object-cover rounded mb-4" />
        <h3 className="text-xl font-bold mb-4">Tem uma ideia?</h3>
        <p className="mb-4 flex-grow">
          Envie suas sugestões e ideias para o email:
          <br />
          <a href="mailto:sitiogpt@gmail.com" className="text-red-600 hover:underline break-words">
            sitiogpt@gmail.com
          </a>
        </p>
      </div>

      {/* Card 2: Novas ideias */}
      <div className="bg-white rounded-lg shadow-xl shadow-red-300 p-6 text-gray-900 flex flex-col">
        <img src={cozinhandoImg} alt="Novas ideias" className="w-full h-40 object-cover rounded mb-4" />
        <h3 className="text-xl font-bold mb-4">Novas ideias chegando</h3>
        <p className="flex-grow">
          Spoiler: estamos trabalhando para aumentar o alcance e permitir filtros por tipo de restaurante. Fique ligado!
        </p>
      </div>

      {/* Card 3: Equipe */}
      <div className="bg-white rounded-lg shadow-xl shadow-red-300 p-6 text-gray-900 flex flex-col">
        <img src={equipeImg} alt="Equipe" className="w-full h-40 object-cover rounded mb-4" />
        <h3 className="text-xl font-bold mb-4">Equipe</h3>
        <p className="mb-4">Somos estudantes de Engenharia da Computação:</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="text-center w-20">
            <img src={developer1} alt="Pedro Lima" className="w-16 h-16 rounded-full mx-auto mb-1" />
            <p className="text-sm">Pedro Lima</p>
          </div>
          <div className="text-center w-20">
            <img src={developer2} alt="Rafael Athaliba" className="w-16 h-16 rounded-full mx-auto mb-1" />
            <p className="text-sm">Rafael Athaliba</p>
          </div>
          <div className="text-center w-20">
            <img src={developer3} alt="Julia Ierseve" className="w-16 h-16 rounded-full mx-auto mb-1" />
            <p className="text-sm">Julia Ierseve</p>
          </div>
          <div className="text-center w-20">
            <img src={developer4} alt="Bianca Andrade" className="w-16 h-16 rounded-full mx-auto mb-1" />
            <p className="text-sm">Bianca Andrade</p>
          </div>
        </div>
      </div>

      {/* Card 4: Sobre o projeto */}
      <div className="bg-white rounded-lg shadow-xl shadow-red-300 p-6 text-gray-900 flex flex-col">
        <img src={quemSomosImg} alt="Sobre o projeto" className="w-full h-40 object-cover rounded mb-4" />
        <h3 className="text-xl font-bold mb-4">Sobre o RankEat</h3>
        <p className="flex-grow">
          O RankEat é um site feito para te ajudar a descobrir os melhores lugares para comer perto de você. Basta informar seu CEP, e nós mostramos um ranking com os restaurantes mais bem avaliados da região. Nosso objetivo é tornar a escolha do próximo lugar para comer mais rápida, prática e indicada.
        </p>
      </div>
    </section>
  );
};

export default MainContentCards;