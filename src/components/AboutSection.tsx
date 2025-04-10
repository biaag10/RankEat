import developer1 from '../assets/Pedro.png';  
import developer2 from '../assets/Rafael.png'; 
import developer3 from '../assets/Julia.png'; 
import developer4 from '../assets/Bia.png';  

const AboutSection = () => {
  return (
    
    <section id="sobre" className="bg-gradient-to-b from-red-500 via-red-700 to-[#8a0500] text-white py-12 mt-20 rounded-tl-[100px] rounded-tr-[100px]">
        
      <div className="text-center">
        {/* Títulos */}
        <h2 className="text-4xl font-bold font-RubikDoodleShadow mb-4">Sobre</h2>

        {/* Descrição */}
        <p className="max-w-4xl mx-auto text-lg font-RedditSansCondensed mb-8">
          O RankEat é um site feito para te ajudar a descobrir os melhores lugares para comer perto de você. Basta informar seu CEP, e nós mostramos um ranking com os restaurantes mais bem avaliados da região. Nosso objetivo é tornar a escolha do próximo lugar para comer mais rápida, prática e indicada.
        </p>


        <h3 className="text-3xl font-bold font-RubikDoodleShadow mb-8">Desenvolvedores</h3>
        {/* Desenvolvedores */}
        <div className="flex justify-center gap-6">
          <div className="text-center">
            <img src={developer4} alt="Julia Ierseve" className="w-24 h-24 rounded-full mb-2" /> 
            <p>Bianca Andrade</p>
          </div>
          <div className="text-center">
             <img src={developer3} alt="Rafael Althabia" className="w-24 h-24 rounded-full mb-2" /> 
            <p>Julia Ierseve</p>
          </div>
          <div className="text-center">
             <img src={developer1} alt="Pedro Lima" className="w-24 h-24 rounded-full mb-2" /> 
            <p>Pedro Lima</p>
          </div>
          <div className="text-center">
             <img src={developer2} alt="Bianca Andrade" className="w-24 h-24 rounded-full mb-2" /> 
            <p>Rafael Althabia</p>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default AboutSection;
