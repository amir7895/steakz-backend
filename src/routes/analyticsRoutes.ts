import { Router } from 'express';
import { getSalesTrends, getCustomerSatisfaction, getStaffProductivity } from '../controllers/analyticsController';
import { authenticateToken } from '../middleware/authMiddleware';
import verifyAdmin from '../middleware/verifyAdmin';

const router = Router();

router.use(authenticateToken, verifyAdmin as any); // Secure all analytics routes

router.get('/sales-trends', getSalesTrends);
router.get('/customer-satisfaction', getCustomerSatisfaction);
router.get('/staff-productivity', getStaffProductivity);

export default router;
