import prisma from './prisma';
import { hashPassword } from './hash';

const resetPassword = async (username: string, newPassword: string) => {
  try {
    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { username },
      data: { password: hashedPassword },
    });

    console.log(`Password for user ${username} has been reset successfully.`);
  } catch (error) {
    console.error('Error resetting password:', error);
  } finally {
    await prisma.$disconnect();
  }
};

export default resetPassword;
