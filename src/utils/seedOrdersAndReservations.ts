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
          date: new Date('2025-06-20'),
          time: '18:00',
          guests: 4,
        },
        {
          customerId: 2,
          date: new Date('2025-06-21'),
          time: '19:00',
          guests: 2,
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
