"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReservation = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createReservation = async (req, res) => {
    try {
        console.log('Incoming Request:', req.method, req.url, req.body);
        const { customerId, date, time, guests, specialRequests, tableNumber } = req.body;
        if (!customerId || !date || !time || !guests || !tableNumber) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        if (typeof customerId !== 'number' || customerId <= 0) {
            res.status(400).json({ error: 'Invalid customerId' });
            return;
        }
        if (!date || isNaN(Date.parse(date))) {
            res.status(400).json({ error: 'Invalid date' });
            return;
        }
        if (!time || !/^\d{2}:\d{2}$/.test(time)) {
            res.status(400).json({ error: 'Invalid time format. Expected HH:mm' });
            return;
        }
        if (typeof tableNumber !== 'number' || tableNumber <= 0) {
            res.status(400).json({ error: 'Invalid tableNumber' });
            return;
        }
        if (typeof guests !== 'number' || guests <= 0) {
            res.status(400).json({ error: 'Invalid number of guests' });
            return;
        }
        const userExists = await prisma_1.default.user.findUnique({ where: { id: customerId } });
        if (!userExists) {
            res.status(404).json({ error: 'Customer not found' });
            return;
        }
        console.log('Validated data:', {
            customerId,
            reservedAt: new Date(`${date}T${time}`),
            tableNumber,
            numberOfGuests: guests,
            specialRequests,
        });
        console.log('Attempting to save reservation to database:', {
            customerId,
            reservedAt: new Date(`${date}T${time}`),
            tableNumber,
            numberOfGuests: guests,
            specialRequests,
        });
        const reservation = await prisma_1.default.reservation.create({
            data: {
                customerId,
                reservedAt: new Date(`${date}T${time}`),
                tableNumber,
                numberOfGuests: guests,
                specialRequests,
            },
        });
        console.log('Reservation successfully saved to database:', reservation);
        console.log('Response being sent to frontend:', { status: 201, data: reservation });
        res.status(201).json(reservation);
    }
    catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Failed to create reservation' });
    }
};
exports.createReservation = createReservation;
//# sourceMappingURL=reservationController.js.map