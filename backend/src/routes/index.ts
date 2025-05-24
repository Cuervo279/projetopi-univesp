import { Router } from 'express';
import producRoutes from './product.routes';
import caixaRoutes from './caixa.routes';
import vendaRoutes from './venda.routes';
import usuarioRoutes from './usuario.routes';
import dashboardRoutes from './dashboard.routes'


const router = Router();
// corrigido alterando a versão npm
router.use('/dashboard',dashboardRoutes)
router.use('/produtos', producRoutes);
router.use('/caixa', caixaRoutes);
router.use('/vendas', vendaRoutes);
router.use('/usuarios', usuarioRoutes); 

router.get('/', (req, res) => {
  res.send('API funcionando!');
});

export default router;