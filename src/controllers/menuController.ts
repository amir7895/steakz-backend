import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const { bestSeller, isNew } = req.query;
    const where: any = {};
    if (bestSeller) where.isBestSeller = bestSeller === 'true';
    if (isNew) where.isNew = isNew === 'true';
    const items = await prisma.menuItem.findMany({ where });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

export const createMenuItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, branchId } = req.body;

    if (!name || !description || !price || !branchId) {
      res.status(400).json({ error: 'Name, description, price, and branchId are required' });
      return;
    }

    const item = await prisma.menuItem.create({
      data: { name, description, price, branchId },
    });
    res.status(201).json(item);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ error: 'Failed to create menu item', details: errorMessage });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.menuItem.update({ where: { id: Number(id) }, data: req.body });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update menu item' });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.menuItem.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete menu item' });
  }
};

export const getItems = async (_req: Request, res: Response) => {
  try {
    const items = await prisma.menuItem.findMany(); // Fetch all items from the database
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};
