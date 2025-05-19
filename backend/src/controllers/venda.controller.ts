import { Request, Response } from 'express';
import { openDb } from '../database/db';

// export async function getVendas(req: Request, res: Response) {
//   const db = await openDb();
//   const vendas = await db.all('SELECT * FROM Venda');
//   res.json(vendas);
// }

export async function getVendas(req: Request, res: Response) {
  const db = await openDb();
  const vendas = await db.all(`
    SELECT 
      Venda.id_venda, Venda.data, Venda.id_produto, Produto.nome, Venda.quantidade, Venda.valor_total, Venda.tipo
    FROM Venda
    INNER JOIN Produto ON Venda.id_produto = Produto.id_produto
  `);
  res.json(vendas);
}


export async function getVendaById(req: Request, res: Response) {
  const db = await openDb();
  const venda = await db.get('SELECT * FROM Venda WHERE id_venda = ?', [req.params.id]);
  res.json(venda);
}

export async function createVenda(req: Request, res: Response) {
  const { data, id_produto, quantidade, valor_total, tipo } = req.body;
  const db = await openDb();
  await db.run(
    `INSERT INTO Venda (data, id_produto, quantidade, valor_total, tipo) 
     VALUES (?, ?, ?, ?, ?)`,
    [data, id_produto, quantidade, valor_total, tipo]
  );
  res.status(201).send('Venda registrada');
}

export async function updateVenda(req: Request, res: Response) {
  const { data, id_produto, quantidade, valor_total, tipo } = req.body;
  const db = await openDb();
  await db.run(
    `UPDATE Venda SET data = ?, id_produto = ?, quantidade = ?, valor_total = ?, tipo = ? 
     WHERE id_venda = ?`,
    [data, id_produto, quantidade, valor_total, tipo, req.params.id]
  );
  res.send('Venda atualizada');
}

export async function deleteVenda(req: Request, res: Response) {
  const db = await openDb();
  await db.run('DELETE FROM Venda WHERE id_venda = ?', [req.params.id]);
  res.send('Venda deletada');
}
