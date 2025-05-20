import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './styles/main.css';
import Header from './components/Header'
import SearchComponent from './components/SearchComponent'
import Favorites from './components/Favorites'
import History from './components/History'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'

function App() {
  const userId = '682bf0e77eb7f73bd298317b'
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODJiZjBlNzdlYjdmNzNiZDI5ODMxN2IiLCJpYXQiOjE3NDc3MTU0NTgsImV4cCI6MTc0NzcxOTA1OH0.IsXCQcTbotMex5vpdod3Fb_kyOvxFN_e5BkmC0KxkRc'

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<SearchComponent userId={userId} token={token} />} />
          <Route path="/favoritos" element={<Favorites userId={userId} token={token} />} />
          <Route path="/historico" element={<History token={token} />} />
          <Route path="/sobre" element={<AboutSection />} />
        </Routes>
      </main>
      <AboutSection /> {/* Componente Sobre os Desenvolvedores */}
      <Footer />
    </div>
  )
}

export default App
