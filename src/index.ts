import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import authRoutes from './routes/authRoutes';
import menuRoutes from './routes/menuRoutes';
import orderRoutes from './routes/orderRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import staffRoutes from './routes/staffRoutes';
import financialRoutes from './routes/financialRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import loyaltyRoutes from './routes/loyaltyRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import reservationRoutes from './routes/reservationRoutes';
import dotenv from 'dotenv';
import cors from 'cors';
import { seedAdminUser, seedManagerUser } from './utils/seedAdmin';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middleware/errorMiddleware';

// Load environment variables
dotenv.config();

const app = express();
const port = 3001;
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://myapp-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
})); // Add CORS support
app.use(express.json());

// Add logging middleware to debug incoming requests
app.use((req, _, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Homepage route
app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to the homepage!');
});

// DEBUG: List all users and their hashed passwords
app.get('/debug-users', async (_req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, username: true, password: true, role: true }
  });
  res.json(users);
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/reservations', reservationRoutes);

// Add the error handling middleware at the end of all routes
app.use(errorHandler);

let server;

// Start the server after seeding admin and manager users
Promise.all([seedAdminUser(), seedManagerUser()])
  .then(() => {
    server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to seed users:', err);
    process.exit(1);
  });

export { app, server };