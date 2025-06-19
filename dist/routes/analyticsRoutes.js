"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyticsController_1 = require("../controllers/analyticsController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/sales-trends', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), analyticsController_1.getSalesTrends);
router.get('/customer-satisfaction', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), analyticsController_1.getCustomerSatisfaction);
router.get('/staff-productivity', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), analyticsController_1.getStaffProductivity);
exports.default = router;
//# sourceMappingURL=analyticsRoutes.js.map