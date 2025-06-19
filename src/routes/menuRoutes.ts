import { Router } from 'express';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem, getItems } from '../controllers/menuController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/items', getItems);
router.get('/', getMenuItems);
router.post('/', authenticateToken, authorizeRole(['ADMIN']), createMenuItem);
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), updateMenuItem);
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN']), deleteMenuItem);

export default router;
