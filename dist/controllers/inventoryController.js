"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInventory = exports.getInventory = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getInventory = async (_req, res) => {
    try {
        const inventory = await prisma_1.default.inventory.findMany();
        res.json(inventory);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
};
exports.getInventory = getInventory;
const updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Update request received for inventory item:', { id, data: req.body });
        const updatedItem = await prisma_1.default.inventory.update({ where: { id: Number(id) }, data: req.body });
        console.log('Updated inventory item:', updatedItem);
        res.json(updatedItem);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to update inventory item' });
    }
};
exports.updateInventory = updateInventory;
//# sourceMappingURL=inventoryController.js.map