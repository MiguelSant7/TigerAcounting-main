import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Vamos criar este arquivo de CSS a seguir

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="copyright">
          Tiger Accounting © 2025 | Todos os direitos reservados
        </div>
        <div className="footer-links">
          {/* Usamos <Link> para links de páginas que estão dentro do seu app React */}
          <Link to="/politicas-de-privacidade">Políticas de Privacidade</Link>
          <Link to="/termos-de-uso">Termos de Uso</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;