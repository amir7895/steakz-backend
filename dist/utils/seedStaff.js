"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedStaffUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma_1 = __importDefault(require("./prisma"));
const hash_1 = require("./hash");
const seedStaffUser = async () => {
    const staffEmail = 'staff@company.com';
    const staffPassword = 'password123';
    const existingStaff = await prisma_1.default.user.findUnique({ where: { username: staffEmail } });
    if (existingStaff) {
        console.log('Staff user already exists');
        return;
    }
    const hashedPassword = await (0, hash_1.hashPassword)(staffPassword);
    const staff = await prisma_1.default.user.create({
        data: {
            username: staffEmail,
            password: hashedPassword,
            role: 'STAFF',
        },
    });
    console.log('✅ Staff user created successfully:', staff);
};
exports.seedStaffUser = seedStaffUser;
(0, exports.seedStaffUser)().catch((error) => {
    console.error('Error seeding staff user:', error);
    process.exit(1);
});
//# sourceMappingURL=seedStaff.js.map