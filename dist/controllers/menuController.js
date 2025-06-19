"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = exports.deleteMenuItem = exports.updateMenuItem = exports.createMenuItem = exports.getMenuItems = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getMenuItems = async (req, res) => {
    try {
        const { bestSeller, isNew } = req.query;
        const where = {};
        if (bestSeller)
            where.isBestSeller = bestSeller === 'true';
        if (isNew)
            where.isNew = isNew === 'true';
        const items = await prisma_1.default.menuItem.findMany({ where });
        res.json(items);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
};
exports.getMenuItems = getMenuItems;
const createMenuItem = async (req, res) => {
    try {
        const item = await prisma_1.default.menuItem.create({ data: req.body });
        res.status(201).json(item);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to create menu item' });
    }
};
exports.createMenuItem = createMenuItem;
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await prisma_1.default.menuItem.update({ where: { id: Number(id) }, data: req.body });
        res.json(item);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to update menu item' });
    }
};
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.menuItem.delete({ where: { id: Number(id) } });
        res.status(204).end();
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to delete menu item' });
    }
};
exports.deleteMenuItem = deleteMenuItem;
const getItems = async (_req, res) => {
    try {
        const items = await prisma_1.default.menuItem.findMany();
        res.json(items);
    }
    catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
};
exports.getItems = getItems;
//# sourceMappingURL=menuController.js.map