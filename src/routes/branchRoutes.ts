import { Router, Request, Response } from 'express';
import verifyAdmin from '../middleware/verifyAdmin';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Create a new branch
router.post('/', verifyAdmin as any, async (req: Request, res: Response): Promise<void> => {
  const { name, location } = req.body;
  if (!name || !location) {
    res.status(400).json({ error: 'Name and location are required' });
    return;
  }

  try {
    const branch = await prisma.branch.create({
      data: { name, location },
    });
    res.status(201).json({ message: 'Branch created successfully', branch });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to create branch', details: errorMessage });
  }
});

// Update branch details
router.put('/:id', verifyAdmin as any, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, location } = req.body;
  if (!name || !location) {
    res.status(400).json({ error: 'Name and location are required' });
    return;
  }

  try {
    const branch = await prisma.branch.update({
      where: { id: parseInt(id, 10) },
      data: { name, location },
    });
    res.status(200).json({ message: 'Branch updated successfully', branch });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update branch', details: errorMessage });
  }
});

// Delete a branch
router.delete('/:id', verifyAdmin as any, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.branch.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(200).json({ message: `Branch with id ${id} deleted successfully` });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete branch', details: errorMessage });
  }
});

export default router;
