import React, { useState } from 'react';
import { authService } from '../services/api';
import { SignupData } from '../types';
import Layout from './Layout';

const Signup: React.FC = () => {
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await authService.signup(formData);
      // Redirecionar para página de sucesso ou login
      window.location.href = '/thank-you';
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao cadastrar usuário');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-orange-500 mb-2">Sign Up</h2>
              <p className="text-gray-600">