import './styles/main.css';
import Header from './components/Header';  // Header
import SearchComponent from './components/SearchComponent';  // Componente de Busca
import RestaurantList from './components/RestaurantList';  // Importando a Lista de Restaurantes
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

function App() {

  return (
    <div>
      <Header />  {/* Cabeçalho com logo e navegação */}
      <SearchComponent />  {/* Componente de Pesquisa de CEP */}
      <RestaurantList />  {/* Componente de Lista de Restaurantes */}
      <AboutSection /> {/* Componente Sobre os Desenvolvedores */}
      <Footer />  {/* Rodapé */}
    </div>
  );
}

export default App;
