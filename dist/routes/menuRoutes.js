"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menuController_1 = require("../controllers/menuController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/items', menuController_1.getItems);
router.get('/', menuController_1.getMenuItems);
router.post('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), menuController_1.createMenuItem);
router.put('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), menuController_1.updateMenuItem);
router.delete('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), menuController_1.deleteMenuItem);
exports.default = router;
//# sourceMappingURL=menuRoutes.js.map