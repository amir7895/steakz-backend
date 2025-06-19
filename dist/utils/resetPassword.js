"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./prisma"));
const hash_1 = require("./hash");
const resetPassword = async (username, newPassword) => {
    try {
        const hashedPassword = await (0, hash_1.hashPassword)(newPassword);
        await prisma_1.default.user.update({
            where: { username },
            data: { password: hashedPassword },
        });
        console.log(`Password for user ${username} has been reset successfully.`);
    }
    catch (error) {
        console.error('Error resetting password:', error);
    }
    finally {
        await prisma_1.default.$disconnect();
    }
};
exports.default = resetPassword;
//# sourceMappingURL=resetPassword.js.map