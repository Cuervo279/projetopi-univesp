import { useState, useEffect } from 'react';
import api from '../services/api';

interface SaleItem {
  id_venda: number;
  dados: string;
  id_produto: number;
  quantidade: number;
  valor_total: number;
  tipo: string;
}

interface GroupedSale {
  id_venda: number;
  dados: string;
  tipo: string;
  itens: SaleItem[];
}

export default function Sales() {
  const [groupedSales, setGroupedSales] = useState<GroupedSale[]>([]);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const response = await api.get('/vendas');
      const sales: SaleItem[] = response.data;

      const grouped: { [key: number]: GroupedSale } = {};

      for (const sale of sales) {
        if (!grouped[sale.id_venda]) {
          grouped[sale.id_venda] = {
            id_venda: sale.id_venda,
            dados: sale.dados,
            tipo: sale.tipo,
            itens: [],
          };
        }
        grouped[sale.id_venda].itens.push(sale);
      }

      setGroupedSales(Object.values(grouped));
    } catch (error) {
      console.error('Erro ao carregar vendas:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Histórico de Vendas</h1>
      {groupedSales.map((group) => (
        <div key={group.id_venda} className="mb-6 border p-4 rounded shadow bg-white">
          <h2 className="text-xl font-semibold">Venda #{group.id_venda}</h2>
          <p className="text-sm text-gray-500">Data: {group.dados}</p>
          <p className="text-sm text-gray-500">Tipo: {group.tipo}</p>
          <h3 className="mt-2 font-medium">Produtos:</h3>
          <ul className="list-disc list-inside ml-4">
            {group.itens.map((item, index) => (
              <li key={index}>
                Produto ID: {item.id_produto} - Quantidade: {item.quantidade}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">
            Total: R$ {group.itens.reduce((acc, item) => acc + item.valor_total, 0).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
