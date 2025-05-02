import { useState, useEffect } from 'react';
import api from '../services/api';

interface Sale {
  id: number;
  total: number;
  date: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);

  // Buscar vendas
  const loadSales = async () => {
    try {
      const response = await api.get('/sales');
      setSales(response.data);
    } catch (error) {
      console.error('Erro ao carregar vendas:', error);
    }
  };

  // Criar nova venda
  const handleCreateSale = async (saleData: {
    total: number;
    products: Array<{ product_id: number; quantity: number }>
  }) => {
    try {
      await api.post('/sales', saleData);
      loadSales(); // Recarregar a lista após criação
    } catch (error) {
      console.error('Erro ao criar venda:', error);
    }
  };

  useEffect(() => {
    loadSales();
  }, []);

  return (
    <div>
      {/* Sua interface gráfica aqui */}
      {sales.map(sale => (
        <div key={sale.id}>
          <h3>Venda #{sale.id}</h3>
          <p>Total: R$ {sale.total.toFixed(2)}</p>
          {/* Renderizar produtos... */}
        </div>
      ))}
    </div>
  );
}