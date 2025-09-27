import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHref, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Se não há token, redireciona para o login
        navigate('/login');
        return;
      }
      
      try {
        const response = await axios.get('http://localhost:8000/users/me/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserName(response.data.nome);
      } catch (error) {
        // Se o token for inválido/expirado, redireciona para o login
        console.error("Erro ao buscar dados do usuário:", error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!userName) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Painel de Controle</h2>
      <h3>Olá, {userName}!</h3>
      <p>Novidades sobre seu sistema financeiro chegarão em breve.</p>
      <button onClick={()=> window.location.href = 'http://127.0.0.1:5500/landing/index.html#home'} className="btn">Home Page</button>
      <button onClick={handleLogout} className="btn">Sair</button>
    </div>
  );
};

export default DashboardPage;