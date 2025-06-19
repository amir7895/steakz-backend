"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedbackController_1 = require("../controllers/feedbackController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['ADMIN']), feedbackController_1.getFeedbacks);
router.post('/', feedbackController_1.createFeedback);
exports.default = router;
//# sourceMappingURL=feedbackRoutes.js.map