"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLoyaltyPoints = exports.getLoyaltyPoints = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getLoyaltyPoints = async (_req, res) => {
    try {
        const points = await prisma_1.default.loyaltyPoint.findMany({ include: { customer: true } });
        res.json(points);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch loyalty points' });
    }
};
exports.getLoyaltyPoints = getLoyaltyPoints;
const updateLoyaltyPoints = async (req, res) => {
    try {
        const { id } = req.params;
        const points = await prisma_1.default.loyaltyPoint.update({ where: { id: Number(id) }, data: req.body });
        res.json(points);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to update loyalty points' });
    }
};
exports.updateLoyaltyPoints = updateLoyaltyPoints;
//# sourceMappingURL=loyaltyController.js.map