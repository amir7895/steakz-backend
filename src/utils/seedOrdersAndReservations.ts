import prisma from './prisma';

const seedOrdersAndReservations = async () => {
  try {
    // Seed Orders
    await prisma.order.createMany({
      data: [
        {
          customerId: 1,
          type: 'Dine-In',
          status: 'Pending',
          total: 50.0,
        },
        {
          customerId: 2,
          type: 'Takeaway',
          status: 'Ready',
          total: 30.0,
        },
      ],
    });

    // Seed Reservations
    await prisma.reservation.createMany({
      data: [
        {
          customerId: 1,
          reservedAt: new Date('2025-06-20T18:00:00'),
          numberOfGuests: 4,
          tableNumber: 1,
        },
        {
          customerId: 2,
          reservedAt: new Date('2025-06-21T19:00:00'),
          numberOfGuests: 2,
          tableNumber: 2,
        },
      ],
    });

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedOrdersAndReservations();
