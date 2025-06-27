import ideiasImg from '../assets/ideias.png';
import cozinhandoImg from '../assets/cozinhando.png';
import equipeImg from '../assets/equipe.png';
import quemSomosImg from '../assets/quemsomos.png';

import developer1 from '../assets/Pedro.png';   
import developer2 from '../assets/Rafael.png';  
import developer3 from '../assets/Julia.png';  
import developer4 from '../assets/Bia.png';  

const MainContentCards = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#8A0500] to-[#B91C1C] text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Sobre o <span className="text-yellow-300">RankEat</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Descubra os melhores restaurantes da sua região com nossa plataforma inteligente de avaliações
          </p>
        </div>
      </section>

      {/* Main Content Cards */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          
          {/* Card 1: Sobre o projeto */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
            <div className="relative overflow-hidden">
              <img 
                src={quemSomosImg} 
                alt="Sobre o projeto" 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-[#8A0500] rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold text-gray-800">Sobre o RankEat</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                O RankEat é uma plataforma inovadora que te ajuda a descobrir os melhores lugares para comer perto de você. 
                Basta informar seu CEP e descubra um ranking com os restaurantes mais bem avaliados da região.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#8A0500]/10 text-[#8A0500]">
                  🍽️ Descoberta Inteligente
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Equipe */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
            <div className="relative overflow-hidden">
              <img 
                src={equipeImg} 
                alt="Equipe" 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold text-gray-800">Nossa Equipe</h3>
              </div>
              <p className="text-gray-600 mb-4">Estudantes de Engenharia da Computação apaixonados por tecnologia:</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center group/member">
                  <div className="relative">
                    <img 
                      src={developer1} 
                      alt="Pedro Lima" 
                      className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-200 group-hover/member:border-[#8A0500] transition-colors" 
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Pedro Lima</p>
                </div>
                <div className="text-center group/member">
                  <div className="relative">
                    <img 
                      src={developer2} 
                      alt="Rafael Athaliba" 
                      className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-200 group-hover/member:border-[#8A0500] transition-colors" 
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Rafael Athaliba</p>
                </div>
                <div className="text-center group/member">
                  <div className="relative">
                    <img 
                      src={developer3} 
                      alt="Julia Ierseve" 
                      className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-200 group-hover/member:border-[#8A0500] transition-colors" 
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Julia Ierseve</p>
                </div>
                <div className="text-center group/member">
                  <div className="relative">
                    <img 
                      src={developer4} 
                      alt="Bianca Andrade" 
                      className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-200 group-hover/member:border-[#8A0500] transition-colors" 
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Bianca Andrade</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600">
                  👥 Engenharia da Computação
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Novas ideias */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
            <div className="relative overflow-hidden">
              <img 
                src={cozinhandoImg} 
                alt="Novas ideias" 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold text-gray-800">Próximas Funcionalidades</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Estamos constantemente evoluindo! Em breve, teremos filtros avançados por tipo de restaurante, 
                maior alcance geográfico e muito mais recursos para melhorar sua experiência.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                  🚀 Em Desenvolvimento
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Tem uma ideia */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
            <div className="relative overflow-hidden">
              <img 
                src={ideiasImg} 
                alt="Ideias" 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold text-gray-800">Tem uma Ideia?</h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Sua opinião é muito importante para nós! Envie suas sugestões e ideias para nos ajudar a melhorar.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Entre em contato:</p>
                <a 
                  href="mailto:sitiogpt@gmail.com" 
                  className="inline-flex items-center text-[#8A0500] hover:text-[#B91C1C] font-medium transition-colors group/email"
                >
                  <span className="mr-2">📧</span>
                  sitiogpt@gmail.com
                  <span className="ml-1 transform transition-transform group-hover/email:translate-x-1">→</span>
                </a>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-600">
                  💡 Feedback & Sugestões
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-[#8A0500] to-[#B91C1C] text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para descobrir seu próximo restaurante favorito?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de usuários que já descobriram os melhores sabores da sua região
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/login'}
              className="bg-white text-[#8A0500] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              Começar Agora
            </button>
            <button 
              onClick={() => window.location.href = 'mailto:sitiogpt@gmail.com'}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#8A0500] transition-colors transform hover:scale-105"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainContentCards;

