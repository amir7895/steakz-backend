import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getStaff = async (_req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findMany({ include: { shift: true, attendance: true, performance: true } });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
};

export const updateStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const staff = await prisma.staff.update({ where: { id: Number(id) }, data: req.body });
    res.json(staff);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update staff' });
  }
};
