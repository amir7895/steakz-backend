import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import dotenv from 'dotenv';
import { Role } from '@prisma/client'; // Import Role enum

import { comparePassword, hashPassword } from '../utils/hash';

dotenv.config();

export const signup = async (req: Request, res: Response): Promise<any> => {
  const { username, password, role = 'WRITER' } = req.body;

  // Validate role
  if (!Object.values(Role).includes(role)) {
    console.error('Invalid role provided:', role);
    return res.status(400).json({ message: 'Invalid role' });
  }

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) return res.status(400).json({ message: 'Username already taken' });

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role,
    },
  });

  res.status(201).json({ message: 'User created', user: { id: user.id, username: user.username, role: user.role } });
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      password: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });
  console.log('Login attempt:', { username });
  if (!user) {
    console.log('User not found');
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  console.log('User found:', user);

  const valid = await comparePassword(password, user.password);
  console.log('Password valid:', valid);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  console.log('User object before token generation:', user);
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );

  // Remove password from user object before sending
  const { password: _, ...userWithoutPassword } = user;

  res.json({
    token,
    user: userWithoutPassword
  });
};