import { Request, Response } from 'express';
import path from 'path';
import { Database } from 'sqlite3';

// Corrige o caminho para o arquivo do banco, relativo ao arquivo atual
const dbPath = path.resolve(__dirname, '../../banco-de-dados/db-pi-joia-laco.db');

const db = new Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err);
  } else {
    console.log('Conectado ao banco SQLite em:', dbPath);
  }
});

// Função para criar uma nova venda
export const createVenda = (req: Request, res: Response) => {
  let { data, id_produto, quantidade, valor_total, tipo, cpf_cliente, forma_pagamento } = req.body;

  if (!data || !id_produto || !quantidade || !valor_total || !tipo || !cpf_cliente || !forma_pagamento) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  // Converte o tipo para minúsculas para garantir compatibilidade com o banco
  tipo = tipo.toLowerCase();

  const tiposValidos = ['online', 'presencial'];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({ error: 'Tipo de atendimento inválido.' });
  }

  const formasPagamentoValidas = ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Pix'];
  if (!formasPagamentoValidas.includes(forma_pagamento)) {
    return res.status(400).json({ error: 'Forma de pagamento inválida.' });
  }

  const insertQuery = `
    INSERT INTO Venda (data, id_produto, quantidade, valor_total, tipo, cpf_cliente, forma_pagamento)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const updateEstoqueQuery = `
    UPDATE Produto SET quantidade = quantidade - ?
    WHERE id_produto = ? AND quantidade >= ?
  `;

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    db.run(
      insertQuery,
      [data, id_produto, quantidade, valor_total, tipo, cpf_cliente, forma_pagamento],
      function (err: Error | null) {
        if (err) {
          db.run('ROLLBACK');
          console.error('Erro ao inserir venda:', err);
          return res.status(500).json({ error: 'Erro ao registrar a venda.' });
        }

        db.run(
          updateEstoqueQuery,
          [quantidade, id_produto, quantidade],
          function (err: Error | null) {
            if (err) {
              db.run('ROLLBACK');
              console.error('Erro ao atualizar estoque:', err);
              return res.status(500).json({ error: 'Erro ao atualizar o estoque.' });
            }

            db.run('COMMIT');
            return res.status(201).json({ message: 'Venda registrada com sucesso!' });
          }
        );
      }
    );
  });
};

// Função para listar todas as vendas
export const getVendas = (req: Request, res: Response) => {
  const query = `
    SELECT 
      v.id_venda,
      v.data,
      v.id_produto,
      p.nome AS nome_produto,
      v.quantidade,
      v.valor_total,
      v.tipo,
      v.cpf_cliente,
      v.forma_pagamento
    FROM Venda v
    JOIN Produto p ON v.id_produto = p.id_produto
    ORDER BY v.id_venda DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar vendas:', err);
      return res.status(500).json({ error: 'Erro ao buscar vendas.' });
    }

    res.json(rows);
  });
};

// Função para obter venda por ID
export const getVendaById = (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `
    SELECT 
      v.id_venda,
      v.data,
      v.id_produto,
      p.nome AS nome_produto,
      v.quantidade,
      v.valor_total,
      v.tipo,
      v.cpf_cliente,
      v.forma_pagamento
    FROM Venda v
    JOIN Produto p ON v.id_produto = p.id_produto
    WHERE v.id_venda = ?
  `;

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error('Erro ao buscar venda:', err);
      return res.status(500).json({ error: 'Erro ao buscar venda.' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Venda não encontrada.' });
    }

    res.json(row);
  });
};

// Função para atualizar uma venda antes bugada
export const updateVenda = (req: Request, res: Response) => {
  const { id } = req.params;
  let { data, id_produto, quantidade, valor_total, tipo, cpf_cliente, forma_pagamento } = req.body;

  if (!data || !id_produto || !quantidade || !valor_total || !tipo || !cpf_cliente || !forma_pagamento) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  tipo = tipo.toLowerCase();

  const tiposValidos = ['online', 'presencial'];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({ error: 'Tipo de atendimento inválido.' });
  }

  const formasPagamentoValidas = ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Pix'];
  if (!formasPagamentoValidas.includes(forma_pagamento)) {
    return res.status(400).json({ error: 'Forma de pagamento inválida.' });
  }

  const query = `
    UPDATE Venda
    SET data = ?, id_produto = ?, quantidade = ?, valor_total = ?, tipo = ?, cpf_cliente = ?, forma_pagamento = ?
    WHERE id_venda = ?
  `;

  db.run(query, [data, id_produto, quantidade, valor_total, tipo, cpf_cliente, forma_pagamento, id], function (err) {
    if (err) {
      console.error('Erro ao atualizar venda:', err);
      return res.status(500).json({ error: 'Erro ao atualizar venda.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Venda não encontrada.' });
    }

    res.json({ message: 'Venda atualizada com sucesso!' });
  });
};

// Função para deletar uma venda
export const deleteVenda = (req: Request, res: Response) => {
  const { id } = req.params;

  const query = 'DELETE FROM Venda WHERE id_venda = ?';

  db.run(query, [id], function (err) {
    if (err) {
      console.error('Erro ao deletar venda:', err);
      return res.status(500).json({ error: 'Erro ao deletar venda.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Venda não encontrada.' });
    }

    res.json({ message: 'Venda deletada com sucesso!' });
  });
};

// Função para obter vendas de hoje
export const getVendasHoje = (req: Request, res: Response) => {
  const hoje = new Date().toISOString().split('T')[0];

  const query = `
    SELECT 
      v.id_venda,
      v.data,
      v.id_produto,
      p.nome AS nome_produto,
      v.quantidade,
      v.valor_total,
      v.tipo,
      v.cpf_cliente,
      v.forma_pagamento
    FROM Venda v
    JOIN Produto p ON v.id_produto = p.id_produto
    WHERE v.data = ?
    ORDER BY v.id_venda DESC
  `;

  db.all(query, [hoje], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar vendas de hoje:', err);
      return res.status(500).json({ error: 'Erro ao buscar vendas de hoje.' });
    }

    res.json(rows);
  });
};
