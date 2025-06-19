import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getFinancialReports = async (_req: Request, res: Response) => {
  try {
    const reports = await prisma.financialReport.findMany();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch financial reports' });
  }
};

export const createFinancialReport = async (req: Request, res: Response) => {
  try {
    const report = await prisma.financialReport.create({ data: req.body });
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create financial report' });
  }
};
