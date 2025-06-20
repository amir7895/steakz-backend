import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../index'; // Import the named export for the Express app
import prisma from '../utils/prisma';

const token = jwt.sign({ userId: 1, role: 'ADMIN' }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });

describe('Order Controller', () => {
  let createdOrderId: number;

  it('should fetch all orders', async () => {
    const response = await request(app).get('/api/orders').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new order', async () => {
    const newOrder = {
      customerId: 1,
      items: [1, 2],
      type: 'Dine-In',
      status: 'Pending',
      total: 100.0,
    };

    const response = await request(app).post('/api/orders/create').set('Authorization', `Bearer ${token}`).send(newOrder);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdOrderId = response.body.id;
  });

  it('should update an existing order', async () => {
    const updatedData = { status: 'Ready' };
    console.log('Update Order Payload:', updatedData);

    const response = await request(app).put(`/api/orders/${createdOrderId}`).set('Authorization', `Bearer ${token}`).send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('Ready');
  });

  it('should delete an order', async () => {
    const response = await request(app).delete(`/api/orders/${createdOrderId}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
});

afterAll(async () => {
  await prisma.$disconnect();

  const { server } = require('../index');
  if (server && server.close) {
    await new Promise((resolve) => server.close(resolve));
  }
});
