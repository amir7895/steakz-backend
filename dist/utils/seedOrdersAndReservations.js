"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./prisma"));
const seedOrdersAndReservations = async () => {
    try {
        await prisma_1.default.order.createMany({
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
        await prisma_1.default.reservation.createMany({
            data: [
                {
                    customerId: 1,
                    reservedAt: new Date('2025-06-20T18:00:00'),
                    time: '18:00',
                    guests: 4,
                },
                {
                    customerId: 2,
                    reservedAt: new Date('2025-06-21T19:00:00'),
                    time: '19:00',
                    guests: 2,
                },
            ],
        });
        console.log('Seeding completed successfully!');
    }
    catch (error) {
        console.error('Error seeding data:', error);
    }
    finally {
        await prisma_1.default.$disconnect();
    }
};
seedOrdersAndReservations();
//# sourceMappingURL=seedOrdersAndReservations.js.map