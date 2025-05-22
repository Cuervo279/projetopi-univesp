import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext'; 

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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    id_produto: '',
    nome: '',
    nome_cliente: '',
    descricao: '',
    preco_custo: '',
    preco_venda: '',
    quantidade: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await api.put(`/produtos/${editingProduct.id_produto}`, formData);  //alterado
    } else {
      await api.post('/produtos', formData); //alterado
    }
    loadProducts();
    setEditingProduct(null);
    setFormData({    
      id_produto: '',
      nome: '',
      nome_cliente: '',
      descricao: '',
      preco_custo: '',
      preco_venda: '',
      quantidade: '' 
    });
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/produtos/${id}`);  // alterado
    loadProducts();
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
          <Link to="/logout" className="text-red-500 hover:text-red-700 border border-transparent rounded-md border-red-500  p-2 px-5">Sair</Link>
        </div>
      </header>

      <h1 className="text-3xl font-bold mb-8 text-stone-100">Registro de Venda</h1>
      
      <form onSubmit={handleSubmit} className="bg-stone-800 p-6 rounded-lg shadow-md mb-8">
        
        
        <div className="grid grid-cols-4 gap-4 mb-4">

         
          <input
            type="text"
            placeholder="Nome do Cliente"
            className="p-2 border rounded col-span-2"
            value={formData.nome_cliente}
            onChange={(e) => setFormData({ ...formData, nome_cliente: e.target.value })}
            required
          />

            <input
            type="text"
            list="formaPagamento"
            placeholder="Forma de Pagamento"
            step="0.01"
            className="p-2 border rounded"
            value={formData.preco_custo}
            onChange={(e) => setFormData({ ...formData, preco_custo: e.target.value })}
            required
            />
            <datalist id="formaPagamento">
                <option value="Dinheiro" />
                <option value="Cartão de Crédito" />
                <option value="Cartão de Débito" />
                <option value="Pix" />
            </datalist>

            <input
            type="text"
            list="tipoVenda"
            placeholder="Tipo de Atendimento"
            step="0.01"
            className="p-2 border rounded"
            //value={formData.preco_custo}
            //onChange={(e) => setFormData({ ...formData, preco_custo: e.target.value })}
            required
            />
            <datalist id="tipoVenda">
                <option value="Online" />
                <option value="Presencial" />
            </datalist>

        <h6 className="text-2xl font-bold mb-8 text-stone-100 col-span-4 p-2">Adicionar novo produto</h6>

          <input
            type="integer"
            placeholder="Código Produto"
            //step="0.01"
            className="p-2 border rounded"
            //value={formData.preco_custo}
            //onChange={(e) => setFormData({ ...formData, preco_custo: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Nome do Produto"
            className="p-2 border rounded col-span-2"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />


          <input
            type="number"
            placeholder="Estoque"
            className="p-2 border rounded"
            value={formData.quantidade}
            onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
            required
          />
        
            <div className="p-2"></div>

                  <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {editingProduct ? 'Atualizar' : 'Cancelar Venda'}
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingProduct ? 'Atualizar' : 'Adicionar Produto'}
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editingProduct ? 'Atualizar' : 'Finalizar Venda'}
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
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-stone-900">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id_produto}>
              <td className="px-6 py-4">{product.id_produto}</td>
              <td className="px-6 py-4">{product.nome}</td>
              <td className="px-6 py-4">{product.descricao}</td>
              <td className="px-6 py-4">R$ {Number(product.preco_custo || 0).toFixed(2)}</td>
              <td className="px-6 py-4">R$ {Number(product.preco_venda || 0).toFixed(2)}</td>
              <td className="px-6 py-4">{product.quantidade}</td>
              <td className="px-6 py-4 space-x-2">
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setFormData({
                      id_produto: product.id_produto.toString(),
                      nome: product.nome,
                      nome_cliente: venda.nome_cliente,
                      descricao: product.descricao,
                      preco_custo: product.preco_custo.toString(),
                      preco_venda: product.preco_venda.toString(),
                      quantidade: product.quantidade.toString(),
                    });
                  }}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id_produto)}
                  className="text-red-600 hover:text-red-900"
                >
                  Excluir
                </button>
              </td>
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