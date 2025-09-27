import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './MainLayout.css';

// CORREÇÃO AQUI: 
// Adicionamos a tipagem React.FC<{ children: React.ReactNode }>
// que diz ao TypeScript que este componente aceita "filhos".
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {children} {/* E aqui renderizamos esses "filhos" */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;