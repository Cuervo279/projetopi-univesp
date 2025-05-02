import { Link } from 'react-router-dom';


export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Produtos em Estoque</h3>
          <p className="text-3xl">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Vendas Hoje</h3>
          <p className="text-3xl">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Vendido</h3>
          <p className="text-3xl">R$ 0</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          to="/stock"
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Gerenciar Estoque
        </Link>
        <Link
          to="/sales"
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Nova Venda
        </Link>
      </div>
    </div>
  );
}