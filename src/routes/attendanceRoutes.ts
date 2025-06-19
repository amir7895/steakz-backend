import { Router } from 'express';
import { getAttendance, updateAttendance } from '../controllers/attendanceController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, authorizeRole(['ADMIN']), getAttendance);
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), updateAttendance);

export default router;
