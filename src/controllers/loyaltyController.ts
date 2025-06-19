import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getLoyaltyPoints = async (_req: Request, res: Response) => {
  try {
    const points = await prisma.loyaltyPoint.findMany({ include: { customer: true } });
    res.json(points);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch loyalty points' });
  }
};

export const updateLoyaltyPoints = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const points = await prisma.loyaltyPoint.update({ where: { id: Number(id) }, data: req.body });
    res.json(points);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update loyalty points' });
  }
};
