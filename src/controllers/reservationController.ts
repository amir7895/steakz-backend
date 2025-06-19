import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createReservation = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Incoming Request:', req.method, req.url, req.body);

        const { customerId, date, time, guests, specialRequests, tableNumber } = req.body;

        // Validate required fields
        if (!customerId || !date || !time || !guests || !tableNumber) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        // Enhanced validation
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

        // Check if customerId exists in the User table
        const userExists = await prisma.user.findUnique({ where: { id: customerId } });
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

        // Create reservation in the database
        const reservation = await prisma.reservation.create({
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
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Failed to create reservation' });
    }
};
