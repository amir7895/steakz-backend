import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    adminCreateUser,
    adminUpdateUser,
    adminChangeRole,
    adminDeleteUser
} from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';
import verifyAdmin from '../middleware/verifyAdmin';

const router = Router();

// Base routes - require authentication
router.get('/', authenticateToken, getAllUsers);                // List users based on role
router.get('/:id', authenticateToken, getUserById);            // View user details and posts

// Public route to fetch all users
router.get('/public', getAllUsers);

// Admin routes - require authentication and admin role
router.use('/admin', authenticateToken, verifyAdmin as any);  // Protect all admin routes

// Group all admin routes
router.post('/', (req, res, next) => {
  const { branchId } = req.body;
  if (!branchId) {
    res.status(400).json({ error: 'branchId is required' });
    return;
  }
  next();
}, adminCreateUser);         // Create new user
router.put('/:id', adminUpdateUser);       // Update user details
router.patch('/:id/role', adminChangeRole); // Change user role
router.delete('/:id', adminDeleteUser);     // Delete user

export default router;
