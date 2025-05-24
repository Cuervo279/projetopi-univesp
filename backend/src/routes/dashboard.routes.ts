import { Router } from 'express';
import { openDb } from '../database/db';
import { format } from 'date-fns';

const router = Router();

router.get('/estoque', async (req, res) => {
  try {
    const db = await openDb();
    const result = await db.get('SELECT SUM(quantidade) as total FROM Produto');
    res.json({ total: result?.total || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos em estoque' });
  }
});

// Vendas de hoje
router.get('/vendas-hoje', async (req, res) => {
  try {
    const db = await openDb();
    const today = format(new Date(), 'yyyy-MM-dd'); // formato ISO para comparação correta
    const result = await db.get('SELECT COUNT(*) as total FROM Venda WHERE data = ?', [today]);
    res.json({ total: result?.total || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar vendas de hoje' });
  }
});

// Total vendido
router.get('/total-vendido', async (req, res) => {
  try {
    const db = await openDb();
    const result = await db.get('SELECT SUM(valor_total) as total FROM Venda');
    res.json({ total: result?.total || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar total vendido' });
  }
});

export default router;
