import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getInventory = async (_req: Request, res: Response) => {
  try {
    const inventory = await prisma.inventory.findMany();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('Update request received for inventory item:', { id, data: req.body });
    const updatedItem = await prisma.inventory.update({ where: { id: Number(id) }, data: req.body });
    console.log('Updated inventory item:', updatedItem);
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update inventory item' });
  }
};
