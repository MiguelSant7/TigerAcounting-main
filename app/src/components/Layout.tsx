import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNavigation = true }) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f1eb' }}>
      {showNavigation && (
        <header style={{ backgroundColor: '#2c2c2c' }} className="p-4">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">🐅</span>
              </div>
            </div>
            <div className="flex space-x-6 text-white">
              <a href="#" className="hover:text-orange-500 transition-colors">Home</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Serviços</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Especialidades</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Parceiros</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Sobre Nós</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Contato</a>
            </div>
            <div className="flex space-x-2">
              <button 
                className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition-colors"
                onClick={() => window.location.href = '/login'}
              >
                Log in
              </button>
              <button 
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                onClick={() => window.location.href = '/signup'}
              >
                Sign up
              </button>
            </div>
          </nav>
        </header>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer style={{ backgroundColor: '#2c2c2c' }} className="text-white p-8 mt-auto">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <p>Tiger Accounting © 2025 | Todos os direitos reservados</p>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-orange-500 transition-colors">Políticas de Privacidade</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Termos de Uso</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;