import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      alert('Login falhou!');
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-stone-950">
      
      
      
      <div className="max-w-md w-full space-y-8 p-8 bg-stone-900 text-stone-100 rounded-lg shadow-lg mb-10">
        <img src="https://i.imgur.com/hCmIS2K.png" className='h-10 mx-auto mt-2'></img>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Senha
            </label>
            <input
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a href='' className='text-rose-600 focus:text-rose-800'>Esqueci minha senha</a>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-800"
          >
            Entrar
          </button>
        </form>
      </div>
      <footer className="absolute bottom-0 left-0 right-0 text-center py-4 bg-stone-900">
        <p className="text-sm text-gray-500">
          &copy; Projeto PI DRP08-PJI110 Univesp @2025 Sistema de Vendas. Todos os direitos reservados.
        </p>
        <p className="text-sm text-gray-500">
          Desenvolvido por GRUPO-009

        </p>
        <img src="https://apps.univesp.br/common/logo-univesp-colorido.svg" alt="Logo Univesp" className="h-10 mx-auto mt-2" />
      </footer>
    </div>

  );
}