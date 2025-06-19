import { PrismaClient } from '@prisma/client'
import { hashPassword } from './hash';

const prisma = new PrismaClient()

export const seedAdminUser = async () => {
  try{
    const adminEmail = 'aissaoui@csss.es';
    const adminPassword = '123';

    const existingAdmin = await prisma.user.findUnique({ where: { username: adminEmail } });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await hashPassword(adminPassword);

    await prisma.user.create({
      data: {
        username: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('✅ Admin user created successfully');
  }
  catch (error) {
    console.error('Error checking for admin user:', error);
    return;
  }
};

export const seedManagerUser = async () => {
  try {
    const managerEmail = 'amir@csss.es';
    const managerPassword = '123';

    const existingManager = await prisma.user.findUnique({ where: { username: managerEmail } });
    if (existingManager) {
      console.log('Manager user already exists');
      return;
    }

    const hashedPassword = await hashPassword(managerPassword);

    await prisma.user.create({
      data: {
        username: managerEmail,
        password: hashedPassword,
        role: 'MANAGER',
      },
    });

    console.log('✅ Manager user created successfully');
  } catch (error) {
    console.error('Error checking for manager user:', error);
    return;
  }
};

export const seedStaffUser = async () => {
  const staffEmail = 'staff@csss.es';
  const staffPassword = 'password123';

  const existingStaff = await prisma.user.findUnique({ where: { username: staffEmail } });
  if (existingStaff) {
    console.log('Staff user already exists');
    return;
  }

  const hashedPassword = await hashPassword(staffPassword);
  await prisma.user.create({
    data: {
      username: staffEmail,
      password: hashedPassword,
      role: 'STAFF',
    },
  });

  console.log('✅ Staff user created successfully');
};
