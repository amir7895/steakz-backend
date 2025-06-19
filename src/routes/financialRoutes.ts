import { Router } from 'express';
import { getFinancialReports, createFinancialReport } from '../controllers/financialController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, authorizeRole(['ADMIN']), getFinancialReports);
router.post('/', authenticateToken, authorizeRole(['ADMIN']), createFinancialReport);

export default router;
