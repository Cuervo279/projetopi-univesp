import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface SaleItem {
  id_venda: number;
  data: string;
  id_produto: number;
  nome: string;
  quantidade: number;
  valor_total: number;
  tipo: string;
}


export default function Sales() {
  const [sales, setSales] = useState<SaleItem[]>([]);
  const [totalGeral, setTotalGeral] = useState<number>(0);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [tipoVenda, setTipoVenda] = useState('');

  useEffect(() => {
    loadSales();
  }, [dataInicio, dataFim, tipoVenda]);

  const loadSales = async () => {
    try {
      const response = await api.get('/vendas');
      const allSales: SaleItem[] = response.data;
      const filtered = allSales.filter((sale) => {
        if (!dataInicio && !dataFim && !tipoVenda) return true;

        const dataVenda = new Date(sale.data);
        const inicio = dataInicio ? new Date(dataInicio) : null;
        const fim = dataFim ? new Date(dataFim) : null;

        if (inicio && dataVenda < inicio) return false;
        if (fim && dataVenda > fim) return false;
        if (tipoVenda && sale.tipo.toLowerCase() !== tipoVenda.toLowerCase()) return false;

        return true;

      });

      const total = filtered.reduce((acc, item) => acc + item.valor_total, 0);

      setSales(filtered);
      setTotalGeral(total);
    } catch (error) {
      console.error('Erro ao carregar vendas:', error);
    }
  };

  return (
    <div className="p-8">
      <header className="bg-stone-950 text-stone-100">
        <div className="flex items-center justify-between p-4">
          <img src="https://i.imgur.com/hCmIS2K.png" alt="Logo" className="h-10" />
          <Link to="/logout" className="text-red-500 hover:text-red-700 border border-transparent rounded-md border-red-500 p-2 px-5 ">Sair</Link>
        </div>
      </header>

      <h1 className="text-3xl font-bold mb-6 text-stone-100">Histórico de Vendas</h1>

      <div className="mb-4 flex items-center gap-4 flex-wrap text-stone-100">
        <div className="flex items-center gap-2">
          <label htmlFor="inicio">De:</label>
          <input
            type="date"
            id="inicio"
            className="bg-stone-700 text-white px-2 py-1 rounded"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="fim">Até:</label>
          <input
            type="date"
            id="fim"
            className="bg-stone-700 text-white px-2 py-1 rounded"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            className="bg-stone-700 text-white px-2 py-1 rounded"
            value={tipoVenda}
            onChange={(e) => setTipoVenda(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="presencial">Presencial</option>
            <option value="online">Online</option>
          </select>
        </div>

        <div className="text-lg font-semibold text-green-400 border border-solid rounded-md border-green-400  p-2 px-5  ml-auto ">
          Total Geral de Vendas: R$ {totalGeral.toFixed(2)}
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse border rounded-md border-stone-600 text-stone-100 bg-stone-800">
        <thead>
          <tr className="bg-stone-700 text-center">
            <th className="p-2 border border-stone-600">Cod. Venda</th>
            <th className="p-2 border border-stone-600">Data Venda</th>
            <th className="p-2 border border-stone-600">Cod. Produto</th>
            <th className="p-2 border border-stone-600">Nome</th>
            <th className="p-2 border border-stone-600">Quantidade</th>
            <th className="p-2 border border-stone-600">Valor Total</th>
            <th className="p-2 border border-stone-600">Tipo Venda</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((item, index) => (
            <tr key={index} className="border-t border-stone-600">
              <td className="p-2 border border-stone-600">{item.id_venda}</td>
              <td className="p-2 border border-stone-600">{item.data}</td>
              <td className="p-2 border border-stone-600">{item.id_produto}</td>
              <td className="p-2 border border-stone-600 text-left">{item.nome}</td>
              <td className="p-2 border border-stone-600">{item.quantidade}</td>
              <td className="p-2 border border-stone-600 text-right px-5">R$ {item.valor_total.toFixed(2)}</td>
              <td className="p-2 border border-stone-600">{item.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
