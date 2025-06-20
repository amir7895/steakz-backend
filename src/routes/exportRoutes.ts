import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import verifyAdmin from '../middleware/verifyAdmin';

const prisma = new PrismaClient();
const router = Router();

router.get('/', verifyAdmin as any, async (req: Request, res: Response): Promise<void> => {
  const type = req.query.type as string;
  const branchId = req.query.branchId as string;

  if (!type || !['csv', 'pdf'].includes(type)) {
    res.status(400).json({ error: 'Invalid or missing export type' });
    return;
  }

  try {
    const data = branchId
      ? await prisma.order.findMany({ where: { branchId: parseInt(branchId, 10) } })
      : await prisma.order.findMany();

    const file = `${type}-export.${type}`;

    // Simulate file generation (e.g., CSV or PDF creation)
    res.status(200).json({ message: `Export successful`, file, data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to export data', details: errorMessage });
  }
});

export default router;
