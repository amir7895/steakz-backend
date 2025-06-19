import { Router } from 'express';
import { getFeedbacks, createFeedback } from '../controllers/feedbackController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, authorizeRole(['ADMIN']), getFeedbacks);
router.post('/', createFeedback);

export default router;
