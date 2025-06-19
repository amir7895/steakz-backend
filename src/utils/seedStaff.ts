import dotenv from 'dotenv';
dotenv.config();

import prisma from './prisma';
import { hashPassword } from './hash';

export const seedStaffUser = async () => {
  const staffEmail = 'staff@company.com';
  const staffPassword = 'password123';

  const existingStaff = await prisma.user.findUnique({ where: { username: staffEmail } });
  if (existingStaff) {
    console.log('Staff user already exists');
    return;
  }

  const hashedPassword = await hashPassword(staffPassword);

  const staff = await prisma.user.create({
    data: {
      username: staffEmail,
      password: hashedPassword,
      role: 'STAFF',
    },
  });

  console.log('✅ Staff user created successfully:', staff);
};

seedStaffUser().catch((error) => {
  console.error('Error seeding staff user:', error);
  process.exit(1);
});
