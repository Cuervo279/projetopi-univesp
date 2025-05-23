import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [estoque, setEstoque] = useState(0);
  const [vendasHoje, setVendasHoje] = useState(0);
  const [totalVendido, setTotalVendido] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/api/dashboard/estoque')
      .then(res => setEstoque(res.data.total));

    axios.get('http://localhost:3001/api/dashboard/vendas-hoje')
      .then(res => setVendasHoje(res.data.total));

    axios.get('http://localhost:3001/api/dashboard/total-vendido')
      .then(res => setTotalVendido(res.data.total));
  }, []);

  return (
    <div className="p-8">
      <header className="bg-stone-950 text-stone-100">
        <div className="flex items-center justify-between p-4">
          <img src="https://i.imgur.com/hCmIS2K.png" alt="Logo" className="h-10" />
          <Link to="/login" className="text-red-500 hover:text-red-700 border border-transparent rounded-md border-red-500  p-2 px-5">Sair</Link>
        </div>
      </header>

      <h1 className="text-3xl text-stone-100 font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-300 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Produtos em Estoque</h3>
          <p className="text-3xl">{estoque}</p>
        </div>
        <div className=" bg-blue-300 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Vendas Hoje</h3>
          <p className="text-3xl">{vendasHoje}</p>
        </div>
        <div className="bg-green-300 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Vendido</h3>
          <p className="text-3xl">R$ {totalVendido.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link to="/stock" className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Gerenciar Estoque
        </Link>
        <Link to="/newsales" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Nova Venda
        </Link>
        <Link to="/sales" className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700">
          Histórico de Vendas
        </Link>
      </div>
    </div>
  );
}
