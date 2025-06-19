import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getAttendance = async (_req: Request, res: Response) => {
  try {
    const attendance = await prisma.attendance.findMany({ include: { staff: true } });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const record = await prisma.attendance.update({ where: { id: Number(id) }, data: req.body });
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update attendance record' });
  }
};
