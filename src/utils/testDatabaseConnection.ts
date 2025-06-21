import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL not found in environment variables');
}

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Test database connection
async function testDB() {
  try {
    await prisma.$connect();
    console.log('✅ Connected to remote PostgreSQL database');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}
testDB();
