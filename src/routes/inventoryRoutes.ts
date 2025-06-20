import { Router } from 'express';
import { getInventory, updateInventory } from '../controllers/inventoryController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';
import prisma from '../utils/prisma';

const router = Router();

router.get('/', authenticateToken, authorizeRole(['ADMIN']), getInventory);
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), updateInventory);
router.post('/', authenticateToken, authorizeRole(['ADMIN']), async (req, res) => {
  try {
    const { itemName, quantity, threshold, branchId } = req.body;

    if (!itemName || !quantity || !threshold || !branchId) {
      res.status(400).json({ error: 'itemName, quantity, threshold, and branchId are required' });
      return;
    }

    const newItem = await prisma.inventory.create({
      data: { itemName, quantity, threshold, branchId },
    });
    res.status(201).json(newItem);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to add inventory item:', errorMessage);
    res.status(500).json({ error: 'Failed to add inventory item', details: errorMessage });
  }
});

export default router;
