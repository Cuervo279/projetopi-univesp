import { Request, Response } from 'express';
import { openDb } from '../database/db';

export async function getTransacoes(req: Request, res: Response) {
  const db = await openDb();
  const transacoes = await db.all('SELECT * FROM Caixa');
  res.json(transacoes);
}

export async function getTransacaoById(req: Request, res: Response) {
  const db = await openDb();
  const transacao = await db.get('SELECT * FROM Caixa WHERE id_transacao = ?', [req.params.id]);
  res.json(transacao);
}

export async function createTransacao(req: Request, res: Response) {
  const { tipo, valor, descricao, data } = req.body;
  const db = await openDb();
  await db.run(
    `INSERT INTO Caixa (tipo, valor, descricao, data) VALUES (?, ?, ?, ?)`,
    [tipo, valor, descricao, data]
  );
  res.status(201).send('Transação criada');
}

export async function updateTransacao(req: Request, res: Response) {
  const { tipo, valor, descricao, data } = req.body;
  const db = await openDb();
  await db.run(
    `UPDATE Caixa SET tipo = ?, valor = ?, descricao = ?, data = ? WHERE id_transacao = ?`,
    [tipo, valor, descricao, data, req.params.id]
  );
  res.send('Transação atualizada');
}

export async function deleteTransacao(req: Request, res: Response) {
  const db = await openDb();
  await db.run('DELETE FROM Caixa WHERE id_transacao = ?', [req.params.id]);
  res.send('Transação deletada');
}
