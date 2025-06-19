"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStaff = exports.getStaff = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getStaff = async (_req, res) => {
    try {
        const staff = await prisma_1.default.staff.findMany({ include: { shift: true, attendance: true, performance: true } });
        res.json(staff);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch staff' });
    }
};
exports.getStaff = getStaff;
const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await prisma_1.default.staff.update({ where: { id: Number(id) }, data: req.body });
        res.json(staff);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to update staff' });
    }
};
exports.updateStaff = updateStaff;
//# sourceMappingURL=staffController.js.map