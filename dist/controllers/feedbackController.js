"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeedback = exports.getFeedbacks = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getFeedbacks = async (_req, res) => {
    try {
        const feedbacks = await prisma_1.default.feedback.findMany({ include: { customer: true } });
        res.json(feedbacks);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch feedbacks' });
    }
};
exports.getFeedbacks = getFeedbacks;
const createFeedback = async (req, res) => {
    try {
        const feedback = await prisma_1.default.feedback.create({ data: req.body });
        res.status(201).json(feedback);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to create feedback' });
    }
};
exports.createFeedback = createFeedback;
//# sourceMappingURL=feedbackController.js.map