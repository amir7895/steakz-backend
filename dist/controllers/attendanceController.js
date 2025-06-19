"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAttendance = exports.getAttendance = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getAttendance = async (_req, res) => {
    try {
        const attendance = await prisma_1.default.attendance.findMany({ include: { staff: true } });
        res.json(attendance);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch attendance records' });
    }
};
exports.getAttendance = getAttendance;
const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await prisma_1.default.attendance.update({ where: { id: Number(id) }, data: req.body });
        res.json(record);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to update attendance record' });
    }
};
exports.updateAttendance = updateAttendance;
//# sourceMappingURL=attendanceController.js.map