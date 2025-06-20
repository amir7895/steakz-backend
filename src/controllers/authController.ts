import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import dotenv from 'dotenv';
import { Role } from '@prisma/client'; // Import Role enum
import Joi from 'joi';

import { comparePassword, hashPassword } from '../utils/hash';

dotenv.config();

// Validation schema
const signupSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('WRITER', 'ADMIN', 'MANAGER', 'USER', 'STAFF').optional(),
});

export const signup = async (req: Request, res: Response): Promise<any> => {
  console.log('Sign-Up Request:', req.body);

  const { error } = signupSchema.validate(req.body);
  if (error) {
    console.error('Validation Error:', error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, password, role = 'WRITER' } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      console.error('Username already taken:', username);
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });

    console.log('User created successfully:', user);
    res.status(201).json({ message: 'User created', user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    console.error('Error during sign-up:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  console.log('Login Request:', req.body);

  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      console.error('User not found:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      console.error('Invalid password for user:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    console.log('Login successful for user:', username);
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};