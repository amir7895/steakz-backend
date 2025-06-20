import { Router } from 'express';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../controllers/orderController';

const router = Router();

router.get('/', (req, _res, next) => {
  const { branchId } = req.query;
  if (branchId) {
    req.query.filter = { branchId };
  }
  next();
}, getOrders);
router.post('/create', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
