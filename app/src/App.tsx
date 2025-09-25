import React, { useState, useEffect } from 'react';

// Types
interface User {
  id_usuario: number;
  nome: string;
  email: string;
  cpf_cnpj: string;
  telefone?: string;
  tipo_usuario: string;
  data_cadastro: string;
  ultimo_login?: string;
  ativo: boolean;
}

interface LoginData {
  email: string;
  senha: string;
}

interface SignupData {
  nome: string;
  email: string;
  senha: string;
  cpf_cnpj: string;
  telefone?: string;
}

// API Service
const API_BASE_URL = 'http://localhost:8000';

const authService = {
  async login(credentials: LoginData) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  async signup(userData: SignupData) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Signup failed');
    return response.json();
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

// Layout Component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f1eb' }}>
      <header style={{ backgroundColor: '#2c2c2c' }} className="p-4">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold text-lg">🐅</span>
            </div>
          </div>
          <div className="flex space-x-6 text-white">
            <a href="../landing/index.html" className="hover:text-orange-500 transition-colors">Home</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Serviços</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Especialidades</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Parceiros</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Sobre Nós</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Contato</a>
          </div>
          <div className="flex space-x-2">
            <button 
              className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition-colors"
              onClick={() => window.location.hash = 'login'}
            >
              Log in
            </button>
            <button 
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              onClick={() => window.location.hash = 'signup'}
            >
              Sign up
            </button>
          </div>
        </nav>
      </header>
      
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

// Signup Component
const Signup: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<SignupData>({
    nome: '',
    email: '',
    senha: '',
    cpf_cnpj: '',
    telefone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await authService.signup(formData);
      onSuccess();
    } catch (err: any) {
      setError('Erro ao cadastrar usuário');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-orange-500 mb-2">Sign Up</h2>
              <p className="text-gray-600">Lorem ipsum eu auctor ut vivamus etiam purus.</p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Placeholder"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border-b-2 border-orange-500 focus:outline-none focus:border-orange-600"
                    style={{ backgroundColor: '#f8f9fa' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Placeholder"
                    className="w-full px-3 py-2 border-b-2 border-orange-500 focus:outline-none focus:border-orange-600"
                    style={{ backgroundColor: '#f8f9fa' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CPF/CNPJ
                  </label>
                  <input
                    type="text"
                    name="cpf_cnpj"
                    placeholder="Placeholder"
                    value={formData.cpf_cnpj}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border-b-2 border-orange-500 focus:outline-none focus:border-orange-600"
                    style={{ backgroundColor: '#f8f9fa' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="text"
                    name="telefone"
                    placeholder="Placeholder"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-b-2 border-orange-500 focus:outline-none focus:border-orange-600"
                    style={{ backgroundColor: '#f8f9fa' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Placeholder"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border-b-2 border-orange-500 focus:outline-none focus:border-orange-600"
                  style={{ backgroundColor: '#f8f9fa' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="senha"
                    placeholder="Placeholder"
                    value={formData.senha}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border-b-2 border-orange-500 focus:outline-none focus:border-orange-600 pr-10"
                    style={{ backgroundColor: '#f8f9fa' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    👁️
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  It must be a combination of minimum 8 letters, numbers, and symbols.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </div>
                <a href="#" className="text-sm text-orange-500 hover:text-orange-600">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Entrando...' : 'Log in'}
              </button>
            </form>

            <div className="text-center mt-6">
              <span className="text-gray-600">
                No account yet?{' '}
                <button
                  onClick={() => window.location.hash = 'signup'}
                  className="text-orange-500 hover:text-orange-600 font-semibold"
                >
                  Sign Up
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Dashboard Component
const Dashboard: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">✓</span>
              </div>
              
              <h1 className="text-4xl font-bold text-orange-500 mb-4">
                Olá, {user.nome.split(' ')[0]}!
              </h1>
              
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Bem-vindo ao Tiger Accounting
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Estamos preparando grandes novidades para você! Nossa plataforma de gestão financeira 
                  está sendo desenvolvida com as melhores tecnologias para oferecer uma experiência 
                  única em controle de fluxo de caixa, relatórios avançados e muito mais.
                </p>
                
                <div className="mt-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <p className="text-orange-800 font-medium">
                    🚀 Novidades em breve: Dashboard interativo, relatórios personalizados, 
                    integração bancária e muito mais!
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '../landing/index.html'}
                  className="px-6 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
                >
                  Voltar ao Site
                </button>
                
                <button
                  onClick={onLogout}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Logout
                </button>
              </div>
              
              <div className="mt-8 text-sm text-gray-500">
                <p>Último acesso: {user.ultimo_login ? new Date(user.ultimo_login).toLocaleString('pt-BR') : 'Primeiro acesso'}</p>
                <p>Conta criada em: {new Date(user.data_cadastro).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Thank You Component
const ThankYou: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">✓</span>
              </div>
              
              <h1 className="text-4xl font-bold text-orange-500 mb-4">Thank You</h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Cadastro realizado com sucesso!
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Sua conta foi criada com sucesso. Agora você pode fazer login e começar a 
                explorar nossa plataforma de gestão financeira. Em breve, você terá acesso 
                a todas as funcionalidades que estamos desenvolvendo especialmente para você.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.hash = 'login'}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Fazer Login
                </button>
                
                <button
                  onClick={() => window.location.href = '../landing/index.html'}
                  className="px-6 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
                >
                  Voltar ao Site
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Main App Component
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    if (authService.isAuthenticated()) {
      const storedUser = authService.getStoredUser();
      if (storedUser) {
        setUser(storedUser);
        setCurrentPage('dashboard');
      }
    }

    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'login';
      if (!authService.isAuthenticated() && hash === 'dashboard') {
        setCurrentPage('login');
      } else {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLoginSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    setCurrentPage('dashboard');
    window.location.hash = 'dashboard';
  };

  const handleSignupSuccess = () => {
    setCurrentPage('thank-you');
    window.location.hash = 'thank-you';
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentPage('login');
    window.location.hash = 'login';
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'signup':
        return <Signup onSuccess={handleSignupSuccess} />;
      case 'login':
        return <Login onSuccess={handleLoginSuccess} />;
      case 'dashboard':
        return user ? <Dashboard user={user} onLogout={handleLogout} /> : <Login onSuccess={handleLoginSuccess} />;
      case 'thank-you':
        return <ThankYou />;
      default:
        return <Login onSuccess={handleLoginSuccess} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
};

export default App;3 top-2 text-gray-500"
                  >
                    👁️
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">
                  Vestibulum faucibus odio vitae arcu auctor lectus.
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Cadastrando...' : 'Button Text'}
              </button>
            </form>

            <div className="text-center mt-6">
              <span className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => window.location.hash = 'login'}
                  className="text-orange-500 hover:text-orange-600 font-semibold"
                >
                  Login
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Login Component
const Login: React.FC<{ onSuccess: (user: User) => void }> = ({ onSuccess }) => {
  const [credentials, setCredentials] = useState<LoginData>({ email: '', senha: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(credentials);
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      onSuccess(response.user);
    } catch (err: any) {
      setError('Email ou senha incorretos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-orange-500 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Please log in to continue</p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Placeholder"
                  value={credentials.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border-b-2 border-orange-500 focus:outline-none focus:border-orange-600"
                  style={{ backgroundColor: '#f8f9fa' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="senha"
                    placeholder="Placeholder"
                    value={credentials.senha}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-3 border-b-2 border-orange-500 focus:outline-none focus:border-orange-600 pr-10"
                    style={{ backgroundColor: '#f8f9fa' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-