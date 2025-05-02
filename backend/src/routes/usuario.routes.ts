import { Router, Request, Response } from 'express';
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  loginUsuario,
  deleteUsuario
} from '../controllers/usuario.controller';

const router = Router();

// Rotas CRUD para usuário
router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.post('/login', loginUsuario);
router.delete('/:id', deleteUsuario);

export default router;
