"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const prisma_1 = __importDefault(require("../utils/prisma"));
const token = jsonwebtoken_1.default.sign({ userId: 1, role: 'ADMIN' }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
describe('Order Controller', () => {
    let createdOrderId;
    it('should fetch all orders', async () => {
        const response = await (0, supertest_1.default)(index_1.app).get('/api/orders').set('Authorization', `Bearer ${token}`);
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
        const response = await (0, supertest_1.default)(index_1.app).post('/api/orders/create').set('Authorization', `Bearer ${token}`).send(newOrder);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        createdOrderId = response.body.id;
    });
    it('should update an existing order', async () => {
        const updatedData = { status: 'Ready' };
        console.log('Update Order Payload:', updatedData);
        const response = await (0, supertest_1.default)(index_1.app).put(`/api/orders/${createdOrderId}`).set('Authorization', `Bearer ${token}`).send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('Ready');
    });
    it('should delete an order', async () => {
        const response = await (0, supertest_1.default)(index_1.app).delete(`/api/orders/${createdOrderId}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(204);
    });
});
afterAll(async () => {
    await prisma_1.default.$disconnect();
    const { server } = require('../index');
    server.close();
});
//# sourceMappingURL=orderController.test.js.map