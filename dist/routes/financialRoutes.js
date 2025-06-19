"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const financialController_1 = require("../controllers/financialController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), financialController_1.getFinancialReports);
router.post('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), financialController_1.createFinancialReport);
exports.default = router;
//# sourceMappingURL=financialRoutes.js.map