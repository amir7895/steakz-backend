"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFinancialReport = exports.getFinancialReports = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getFinancialReports = async (_req, res) => {
    try {
        const reports = await prisma_1.default.financialReport.findMany();
        res.json(reports);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch financial reports' });
    }
};
exports.getFinancialReports = getFinancialReports;
const createFinancialReport = async (req, res) => {
    try {
        const report = await prisma_1.default.financialReport.create({ data: req.body });
        res.status(201).json(report);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to create financial report' });
    }
};
exports.createFinancialReport = createFinancialReport;
//# sourceMappingURL=financialController.js.map