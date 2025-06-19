"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrders = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const joi_1 = __importDefault(require("joi"));
const orderSchema = joi_1.default.object({
    customerId: joi_1.default.number().required(),
    items: joi_1.default.array().items(joi_1.default.number()).required(),
    type: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
    total: joi_1.default.number().required(),
});
const partialOrderSchema = joi_1.default.object({
    customerId: joi_1.default.number().optional(),
    items: joi_1.default.array().items(joi_1.default.number()).optional(),
    type: joi_1.default.string().optional(),
    status: joi_1.default.string().optional(),
    total: joi_1.default.number().optional(),
});
const getOrders = async (_req, res) => {
    try {
        const orders = await prisma_1.default.order.findMany({ include: { items: true, customer: true } });
        res.json(orders);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
exports.getOrders = getOrders;
const createOrder = async (req, res) => {
    try {
        console.log('Received request to create order');
        console.log('Request Body:', req.body);
        console.log('Incoming Request:', req.method, req.url, req.body);
        const { error, value } = orderSchema.validate(req.body);
        if (error) {
            console.error('Validation Error:', error.details);
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        const { customerId, type, status, total, items } = value;
        console.log('Validated request body:', { customerId, type, status, total, items });
        const order = await prisma_1.default.order.create({
            data: {
                customerId,
                type,
                status,
                total,
            },
        });
        console.log('Order Created:', order);
        res.status(201).json(order);
    }
    catch (error) {
        console.error('Error creating order:', error);
        if (error.code) {
            console.error('Prisma Error Code:', error.code);
            console.error('Prisma Error Meta:', error.meta);
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.createOrder = createOrder;
const updateOrder = async (req, res) => {
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
        const order = await prisma_1.default.order.update({ where: { id: Number(id) }, data: req.body });
        res.json(order);
    }
    catch (err) {
        console.error('Error updating order:', err);
        res.status(400).json({ error: 'Failed to update order' });
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (req, res) => {
    try {
        console.log('Delete Order Request:', req.params);
        const { id } = req.params;
        if (isNaN(Number(id))) {
            res.status(400).json({ error: 'Invalid order ID' });
            return;
        }
        await prisma_1.default.order.delete({ where: { id: Number(id) } });
        res.status(204).end();
    }
    catch (err) {
        console.error('Error deleting order:', err);
        res.status(400).json({ error: 'Failed to delete order' });
    }
};
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=orderController.js.map