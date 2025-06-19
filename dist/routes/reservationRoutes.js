"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservationController_1 = require("../controllers/reservationController");
const router = (0, express_1.Router)();
router.post('/', reservationController_1.createReservation);
exports.default = router;
//# sourceMappingURL=reservationRoutes.js.map