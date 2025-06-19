import { Router } from 'express';
import { getLoyaltyPoints, updateLoyaltyPoints } from '../controllers/loyaltyController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, authorizeRole(['ADMIN']), getLoyaltyPoints);
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), updateLoyaltyPoints);

export default router;
