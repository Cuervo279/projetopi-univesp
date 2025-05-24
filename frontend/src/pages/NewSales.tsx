import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Product {
  id_produto: number;
  nome: string;
  descricao: string;
  preco_custo: number;
  preco_venda: number;
  quantidade: number;
}

export default function NewSales() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    id_produto: '',
    nome_cliente: '',
    quantidade: '',
    forma_pagamento: '',
    tipo: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadProducts = async () => {
    const response = await api.get('/produtos');
    setProducts(response.data as Product[]);
  };

  const handleFinalizarVenda = async () => {
    try {
      const produto = products.find(p => p.id_produto === Number(formData.id_produto));
      if (!produto) {
        alert('Produto não encontrado');
        return;
      }

      const tiposValidos = ['Online', 'Presencial'];
      const formasPagamentoValidas = ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Pix'];

      if (!tiposValidos.includes(formData.tipo)) {
        alert('Tipo de atendimento inválido. Escolha entre Online ou Presencial.');
        return;
      }

      if (!formasPagamentoValidas.includes(formData.forma_pagamento)) {
        alert('Forma de pagamento inválida. Escolha uma opção válida.');
        return;
      }

      const vendaData = {
        data: new Date().toISOString().split('T')[0],
        id_produto: Number(formData.id_produto),
        quantidade: Number(formData.quantidade),
        valor_total: produto.preco_venda * Number(formData.quantidade),
        tipo: formData.tipo,
        cpf_cliente: formData.nome_cliente,
        forma_pagamento: formData.forma_pagamento,
      };

      await api.post('/vendas', vendaData);
      alert('Venda registrada com sucesso!');
      setFormData({
        id_produto: '',
        nome_cliente: '',
        quantidade: '',
        forma_pagamento: '',
        tipo: '',
      });
      loadProducts();
    } catch (error) {
      alert('Erro ao registrar venda.');
      console.error(error);
    }
  };

  const totalPrecoCusto = products.reduce((acc, item) => acc + item.preco_custo * item.quantidade, 0);
  const totalPrecoVenda = products.reduce((acc, item) => acc + item.preco_venda * item.quantidade, 0);
  const totalQuantidade = products.reduce((acc, item) => acc + item.quantidade, 0);
  const totalLucro = totalPrecoVenda - totalPrecoCusto;

  return (
    <div className="p-8">
      <header className="bg-stone-950 text-stone-100">
        <div className="flex items-center justify-between p-4">
          <img src="https://i.imgur.com/hCmIS2K.png" alt="Logo" className="h-10" />
          <Link to="/logout" className="text-red-500 hover:text-red-700 border border-transparent rounded-md border-red-500 p-2 px-5">Sair</Link>
        </div>
      </header>

      <h1 className="text-3xl font-bold mb-8 text-stone-100">Registro de Venda</h1>

      <form onSubmit={(e) => e.preventDefault()} className="bg-stone-800 p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nome do Cliente ou CPF"
            className="p-2 border rounded col-span-2"
            value={formData.nome_cliente}
            onChange={(e) => setFormData({ ...formData, nome_cliente: e.target.value })}
            required
          />

          <select
            className="p-2 border rounded"
            value={formData.forma_pagamento}
            onChange={(e) => setFormData({ ...formData, forma_pagamento: e.target.value })}
            required
          >
            <option value="">Forma de Pagamento</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Pix">Pix</option>
          </select>

          <select
            className="p-2 border rounded"
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
            required
          >
            <option value="">Tipo de Atendimento</option>
            <option value="Online">Online</option>
            <option value="Presencial">Presencial</option>
          </select>

          <h6 className="text-2xl font-bold mb-8 text-stone-100 col-span-4 p-2">Selecionar Produto</h6>

          <select
            className="p-2 border rounded col-span-2"
            value={formData.id_produto}
            onChange={(e) => setFormData({ ...formData, id_produto: e.target.value })}
            required
          >
            <option value="">Selecione o Produto</option>
            {products.map((p) => (
              <option key={p.id_produto} value={p.id_produto}>
                {p.id_produto} - {p.nome}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantidade"
            className="p-2 border rounded"
            value={formData.quantidade}
            onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
            required
          />

          <div></div>

          <button
            type="button"
            onClick={handleFinalizarVenda}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 col-span-4"
          >
            Finalizar Venda
          </button>
        </div>
      </form>

      <div className="bg-stone-800 text-stone-100 p-4 rounded-lg mb-4 flex justify-between">
        <div>Preço Custo Total: <span className="font-bold">R$ {totalPrecoCusto.toFixed(2)}</span></div>
        <div>Preço Venda Total: <span className="font-bold">R$ {totalPrecoVenda.toFixed(2)}</span></div>
        <div>Total Lucro:<br /><span className="font-bold text-green-400">R$ {totalLucro.toFixed(2)}</span></div>
        <div>Total Quantidade de Produtos: <span className="font-bold">{totalQuantidade}</span></div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-stone-900">Cod. Produto</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-stone-900">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-stone-900 ">Descrição</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-stone-900 ">Preço Custo</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-stone-900">Preço Venda</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-stone-900">Quantidade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id_produto}>
                <td className="px-6 py-4">{product.id_produto}</td>
                <td className="px-6 py-4">{product.nome}</td>
                <td className="px-6 py-4">{product.descricao}</td>
                <td className="px-6 py-4">R$ {product.preco_custo.toFixed(2)}</td>
                <td className="px-6 py-4">R$ {product.preco_venda.toFixed(2)}</td>
                <td className="px-6 py-4">{product.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg z-50"
          title="Voltar ao topo"
        >
          ↑ Topo
        </button>
      )}
    </div>
  );
}
