import { Router } from 'express';
import { getInventory, updateInventory } from '../controllers/inventoryController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';
import prisma from '../utils/prisma';

const router = Router();

router.get('/', authenticateToken, authorizeRole(['ADMIN']), getInventory);
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), updateInventory);
router.post('/', authenticateToken, authorizeRole(['ADMIN']), async (req, res) => {
  try {
    console.log('Incoming inventory data:', req.body);
    const newItem = await prisma.inventory.create({
      data: req.body,
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Failed to add inventory item:', error);
    res.status(500).json({ error: 'Failed to add inventory item' });
  }
});

export default router;
