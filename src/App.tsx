import './styles/main.css';
import Header from './components/Header';  // Header
import SearchComponent from './components/SearchComponent';  // Componente de Busca
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />  {/* Cabeçalho com logo e navegação */}
      <SearchComponent />  {/* Componente de Pesquisa de CEP */}
      <AboutSection /> {/* Componente Sobre os Desenvolvedores */}
      {/* Isso empurra o rodapé para baixo quando o conteúdo não for suficiente para preencher a tela */}
      <div className="flex-grow"></div> 
      <Footer />  {/* Rodapé */}
    </div>
  );
}

export default App;
