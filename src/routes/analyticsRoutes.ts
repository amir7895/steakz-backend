import { Router } from 'express';
import { getSalesTrends, getCustomerSatisfaction, getStaffProductivity } from '../controllers/analyticsController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/sales-trends', authenticateToken, authorizeRole(['ADMIN']), getSalesTrends);
router.get('/customer-satisfaction', authenticateToken, authorizeRole(['ADMIN']), getCustomerSatisfaction);
router.get('/staff-productivity', authenticateToken, authorizeRole(['ADMIN']), getStaffProductivity);

export default router;
