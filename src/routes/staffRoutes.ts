import { Router } from 'express';
import { getStaff, updateStaff } from '../controllers/staffController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, authorizeRole(['ADMIN']), getStaff);
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), updateStaff);

export default router;
