import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getFeedbacks = async (_req: Request, res: Response) => {
  try {
    const feedbacks = await prisma.feedback.findMany({ include: { customer: true } });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
};

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await prisma.feedback.create({ data: req.body });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create feedback' });
  }
};
