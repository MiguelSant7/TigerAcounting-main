import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Certifique-se de criar e preencher este arquivo
import logoTiger from '../../assets/imgs/logohorizontal.png';

const Header = () => {
  // Estado para controlar se a sidebar está aberta ou fechada
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Função para abrir a sidebar
  const openSidebar = () => setSidebarOpen(true);

  // Função para fechar a sidebar
  const closeSidebar = () => setSidebarOpen(false);

  return (
    // Lembre-se: em JSX, o atributo é 'className', não 'class'
    <header>
      {/* Navegação para Desktop */}
      <nav id="first-nav">
        <div className="logo">
          <a href="http://127.0.0.1:5500/landing/index.html">
            <img src={logoTiger} alt="Logo Tiger Accounting Contabilidade" />
         </a>  
        </div>
        <div className="nav-links">
          {/* Usamos <a> para links de âncora na mesma página */}
          <a href="http://127.0.0.1:5500/landing/index.html#home">Home</a>
          <a href="http://127.0.0.1:5500/landing/index.html#servi%C3%A7os">Serviços</a>
          <a href="http://127.0.0.1:5500/landing/index.html#especialidades">Especialidades</a>
          <a href="http://127.0.0.1:5500/landing/index.html#sobre">Sobre Nós</a>
          <a href="http://127.0.0.1:5500/landing/index.html#contato">Contato</a>
          {/* Usamos <Link> para navegar entre as páginas do React */}
          <Link to="/login" className="btn-login">Log in</Link>
          <Link to="/signup" className="btn-signup">Sign up</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;