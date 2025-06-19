import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getSalesTrends = async (_req: Request, res: Response) => {
  try {
    const sales = await prisma.financialReport.findMany({ orderBy: { date: 'asc' } });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sales trends' });
  }
};

export const getCustomerSatisfaction = async (_req: Request, res: Response) => {
  try {
    const feedbacks = await prisma.feedback.findMany();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customer satisfaction data' });
  }
};

export const getStaffProductivity = async (_req: Request, res: Response) => {
  try {
    const performance = await prisma.performance.findMany();
    res.json(performance);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch staff productivity data' });
  }
};
