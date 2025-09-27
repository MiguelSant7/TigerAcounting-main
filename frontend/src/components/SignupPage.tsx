import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:8000/signup/', {
        nome,
        email,
        cpf_cnpj: cpfCnpj,
        telefone,
        password
      });
      // Redireciona para uma página de sucesso ou login
      navigate('/login');
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail);
      } else {
        setError('Ocorreu um erro ao tentar se cadastrar.');
      }
    }
  };

  return (
    <div className="form-container">
      <div className="title">
        <h2>Cadastre-se</h2>
        <p>Por favor preencha o formulario para cria sua conta.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome Completo</label>
          <input 
            type="text" 
            placeholder="Digite seu nome completo" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>

        <div className="double-form">
          <div className="form-group">
          <label>CPF/CNPJ</label>
          <input 
            type="text" 
            placeholder="Digite seu CPF ou CNPJ" 
            value={cpfCnpj} 
            onChange={(e) => setCpfCnpj(e.target.value)} 
            required 
          />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input 
              type="tel" 
              placeholder="(00) 00000-0000" 
              value={telefone} 
              onChange={(e) => setTelefone(e.target.value)} 
              required 
            />
          </div>

        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Senha</label>
          <input 
            type="password" 
            placeholder="Crie uma senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            maxLength={72} 
          />
        </div>

        <button type="submit" className="btn">Cadastrar</button>
        {error && <p className="error-message">{error}</p>}
      </form>

      <hr className="divider" />
      <p className="link-text">Já tem uma conta? <Link to="/login">Faça Login</Link></p>
    </div>
  );
};

export default SignupPage;