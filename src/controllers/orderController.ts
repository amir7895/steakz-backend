import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import Joi from 'joi';

const orderSchema = Joi.object({
  customerId: Joi.number().required(),
  items: Joi.array().items(Joi.number()).required(),
  type: Joi.string().required(),
  status: Joi.string().required(),
  total: Joi.number().required(),
});

const partialOrderSchema = Joi.object({
  customerId: Joi.number().optional(),
  items: Joi.array().items(Joi.number()).optional(),
  type: Joi.string().optional(),
  status: Joi.string().optional(),
  total: Joi.number().optional(),
});

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({ include: { items: true, customer: true } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received request to create order');
    console.log('Request Body:', req.body); // Log the incoming request body

    // Validate the request body
    const { error, value } = orderSchema.validate(req.body);
    if (error) {
      console.error('Validation Error:', error.details);
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { customerId, type, status, total, items } = value;
    console.log('Validated request body:', { customerId, type, status, total, items }); // Log validated data

    // Check if the customer exists
    const customerExists = await prisma.user.findUnique({ where: { id: customerId } });
    if (!customerExists) {
      res.status(400).json({ error: 'Customer does not exist' });
      return;
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        customerId,
        type,
        status,
        total,
      },
    });
    console.log('Order Created:', order); // Log the created order

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error); // Log any errors

    // Check if the error is related to Prisma or database
    if ((error as any).code) {
      console.error('Prisma Error Code:', (error as any).code);
      console.error('Prisma Error Meta:', (error as any).meta); // Log additional error metadata
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    console.log('Update Order Request:', req.body, req.params);
    const { id } = req.params;
    if (isNaN(Number(id))) {
      res.status(400).json({ error: 'Invalid order ID' });
      return;
    }

    const { error } = partialOrderSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const order = await prisma.order.update({ where: { id: Number(id) }, data: req.body });
    res.json(order);
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(400).json({ error: 'Failed to update order' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    console.log('Delete Order Request:', req.params);
    const { id } = req.params;
    if (isNaN(Number(id))) {
      res.status(400).json({ error: 'Invalid order ID' });
      return;
    }

    await prisma.order.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(400).json({ error: 'Failed to delete order' });
  }
};
