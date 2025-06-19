import { Router } from 'express';
import { createReservation } from '../controllers/reservationController';

const router = Router();

// Route to create a reservation
router.post('/', createReservation);

export default router;