import { Router } from 'express';
import {
  getVendas,
  getVendaById,
  createVenda,
  updateVenda,
  deleteVenda
} from '../controllers/venda.controller';

const router = Router();

router.get('/', getVendas);
router.get('/:id', getVendaById);
router.post('/', createVenda);
router.put('/:id', updateVenda);
router.delete('/:id', deleteVenda);

export default router;
