import { Request, Response } from 'express';
import { openDb } from '../database/db';

export async function getProdutos(req: Request, res: Response) {
  const db = await openDb();
  const produtos = await db.all('SELECT * FROM Produto');
  res.json(produtos);
}

export async function getProdutoById(req: Request, res: Response) {
  const db = await openDb();
  const produto = await db.get('SELECT * FROM Produto WHERE id_produto = ?', [req.params.id]);
  res.json(produto);
}

export async function createProduto(req: Request, res: Response) {
  const { nome, descricao, preco_custo, preco_venda, quantidade, validade, codigo } = req.body;
  const db = await openDb();
  await db.run(
    `INSERT INTO Produto (nome, descricao, preco_custo, preco_venda, quantidade, validade, codigo) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nome, descricao, preco_custo, preco_venda, quantidade, validade, codigo]
  );
  res.status(201).send('Produto criado');
}

export async function updateProduto(req: Request, res: Response) {
  const { nome, descricao, preco_custo, preco_venda, quantidade, validade, codigo } = req.body;
  const db = await openDb();
  await db.run(
    `UPDATE Produto SET nome = ?, descricao = ?, preco_custo = ?, preco_venda = ?, quantidade = ?, validade = ?, codigo = ? 
     WHERE id_produto = ?`,
    [nome, descricao, preco_custo, preco_venda, quantidade, validade, codigo, req.params.id]
  );
  res.send('Produto atualizado');
}

export async function deleteProduto(req: Request, res: Response) {
  const db = await openDb();
  await db.run('DELETE FROM Produto WHERE id_produto = ?', [req.params.id]);
  res.send('Produto deletado');
}
