import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { seedAdminUser, seedManagerUser } from './utils/seedAdmin';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middleware/errorMiddleware';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient();

// Middleware
const allowedOrigin = 'https://steakz-frontend.onrender.com';

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
})); // Add CORS support

// Handle preflight requests (important for CORS with credentials)
app.options('*', cors({
  origin: allowedOrigin,
  credentials: true,
}));

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

// Add the error handling middleware at the end of all routes
app.use(errorHandler);

let server;

// Start the server after seeding admin and manager users
Promise.all([seedAdminUser(), seedManagerUser()])
  .then(() => {
    server = app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to seed users:', err);
    process.exit(1);
  });

export { app, server };