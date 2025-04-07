import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaBars } from 'react-icons/fa';
import logo from '../assets/logo.png';
import '../App.css';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [subsistemasOpen, setSubsistemasOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate(); // Hook para redirecionamento

    const navbarItens = [
        { name: 'SOBRE', link: '#' },
    ];

    // Fechar o dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
                setSubsistemasOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            {/* Logo + Nome da Equipe */}
            <div className="logo-container">
                <div className="logo">
                    {/* Ícone do Baja agora redireciona para Home */}
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className="logo-img" 
                        onClick={() => navigate('#')} // Redireciona ao clicar
                    />
                </div>

                {/* Ícone de menu para telas móveis */}
                <button 
                    className="menu-icon"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaBars size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Navbar */}
            <div className="navbar">
                <nav id="navbar" className={`navbar-content ${isOpen || window.screen.width >= 640 ? 'open' : ''}`}>
                    <ul className="navbar-items">
                        {navbarItens.map((item) => (
                            item.name === 'SUBSISTEMAS' ? (
                                <div 
                                    key={item.name} 
                                    className="dropdown-container"
                                    ref={dropdownRef}
                                    onMouseEnter={() => window.innerWidth >= 640 && setDropdownOpen(true)}
                                >
                                    {/* Botão que expande o menu */}
                                    <button 
                                        className="dropdown-btn"
                                        onClick={() => {
                                            if (window.innerWidth >= 640) {
                                                setDropdownOpen(!dropdownOpen);
                                            } else {
                                                setSubsistemasOpen(!subsistemasOpen);
                                            }
                                        }}
                                    >
                                        {item.name}
                                        <FaChevronDown 
                                            size={12} 
                                            className={`dropdown-icon ${dropdownOpen || subsistemasOpen ? 'rotate' : ''}`}
                                        />
                                    </button>

                                </div>
                            ) : (
                                <Link key={item.name} to={item.link} className="navbar-link">
                                    <li className="navbar-item">
                                        {item.name}
                                        <div className="navbar-hover"></div>
                                    </li>
                                </Link>
                            )
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
