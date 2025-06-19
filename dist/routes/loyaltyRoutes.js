"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loyaltyController_1 = require("../controllers/loyaltyController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), loyaltyController_1.getLoyaltyPoints);
router.put('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), loyaltyController_1.updateLoyaltyPoints);
exports.default = router;
//# sourceMappingURL=loyaltyRoutes.js.map