"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventoryController_1 = require("../controllers/inventoryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const prisma_1 = __importDefault(require("../utils/prisma"));
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), inventoryController_1.getInventory);
router.put('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), inventoryController_1.updateInventory);
router.post('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), async (req, res) => {
    try {
        console.log('Incoming inventory data:', req.body);
        const newItem = await prisma_1.default.inventory.create({
            data: req.body,
        });
        res.status(201).json(newItem);
    }
    catch (error) {
        console.error('Failed to add inventory item:', error);
        res.status(500).json({ error: 'Failed to add inventory item' });
    }
});
exports.default = router;
//# sourceMappingURL=inventoryRoutes.js.map