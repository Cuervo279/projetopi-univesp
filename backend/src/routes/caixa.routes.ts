import { Router } from 'express';
import {
  getTransacoes,
  getTransacaoById,
  createTransacao,
  updateTransacao,
  deleteTransacao
} from '../controllers/caixa.controller';

const router = Router();

router.get('/', getTransacoes);
router.get('/:id', getTransacaoById);
router.post('/', createTransacao);
router.put('/:id', updateTransacao);
router.delete('/:id', deleteTransacao);

export default router;
