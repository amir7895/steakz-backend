"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaffProductivity = exports.getCustomerSatisfaction = exports.getSalesTrends = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getSalesTrends = async (_req, res) => {
    try {
        const sales = await prisma_1.default.financialReport.findMany({ orderBy: { date: 'asc' } });
        res.json(sales);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch sales trends' });
    }
};
exports.getSalesTrends = getSalesTrends;
const getCustomerSatisfaction = async (_req, res) => {
    try {
        const feedbacks = await prisma_1.default.feedback.findMany();
        res.json(feedbacks);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch customer satisfaction data' });
    }
};
exports.getCustomerSatisfaction = getCustomerSatisfaction;
const getStaffProductivity = async (_req, res) => {
    try {
        const performance = await prisma_1.default.performance.findMany();
        res.json(performance);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch staff productivity data' });
    }
};
exports.getStaffProductivity = getStaffProductivity;
//# sourceMappingURL=analyticsController.js.map