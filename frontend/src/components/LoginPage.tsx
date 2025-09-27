import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    try {
      const response = await axios.post('http://localhost:8000/login/', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      // Guarda o token no localStorage
      localStorage.setItem('token', response.data.access_token);
      // Redireciona para o dashboard
      navigate('/dashboard');
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail);
      } else {
        setError('Ocorreu um erro ao tentar fazer login.');
      }
    }
  };

  return (
    <div className="form-container">
      <div className='title'>
        <h2>Bem vindo de volta!</h2>
        <p>Por favor faça login para continuar</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder='Seu melhor email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input type="password" placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn">Log In</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <hr className="divider" />
      <p className="link-text">Não tem uma conta? <Link to="/signup">Cadastre-se</Link></p>
    </div>
  );
};

export default LoginPage;