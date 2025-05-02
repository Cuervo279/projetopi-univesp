import { useState, useEffect } from 'react';
import api from '../services/api'; // Corrigido o caminho
import { useAuth } from '../contexts/AuthContext'; 

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function Stock() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await api.get('/produtos');
    setProducts(response.data as Product[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await api.put(`/produtos/${editingProduct.id}`, formData);  //alterado
    } else {
      await api.post('/produtos', formData); //alterado
    }
    loadProducts();
    setEditingProduct(null);
    setFormData({ name: '', price: '', stock: '' });
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/produtos/${id}`);  // alterado
    loadProducts();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Gerenciamento de Estoque</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nome do Produto"
            className="p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            step="0.01"
            className="p-2 border rounded"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Estoque"
            className="p-2 border rounded"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingProduct ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Preço</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Estoque</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">R$ {product.price.toFixed(2)}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setFormData({
                        name: product.name,
                        price: product.price.toString(),
                        stock: product.stock.toString()
                      });
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
    </div>
  );
}