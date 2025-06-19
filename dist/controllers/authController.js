"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const hash_1 = require("../utils/hash");
dotenv_1.default.config();
const signup = async (req, res) => {
    const { username, password, role = 'WRITER' } = req.body;
    if (!Object.values(client_1.Role).includes(role)) {
        console.error('Invalid role provided:', role);
        return res.status(400).json({ message: 'Invalid role' });
    }
    const existingUser = await prisma_1.default.user.findUnique({ where: { username } });
    if (existingUser)
        return res.status(400).json({ message: 'Username already taken' });
    const hashedPassword = await (0, hash_1.hashPassword)(password);
    const user = await prisma_1.default.user.create({
        data: {
            username,
            password: hashedPassword,
            role,
        },
    });
    res.status(201).json({ message: 'User created', user: { id: user.id, username: user.username, role: user.role } });
};
exports.signup = signup;
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma_1.default.user.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            password: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    });
    console.log('Login attempt:', { username });
    if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('User found:', user);
    const valid = await (0, hash_1.comparePassword)(password, user.password);
    console.log('Password valid:', valid);
    if (!valid)
        return res.status(401).json({ message: 'Invalid credentials' });
    console.log('User object before token generation:', user);
    const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const { password: _, ...userWithoutPassword } = user;
    res.json({
        token,
        user: userWithoutPassword
    });
};
exports.login = login;
//# sourceMappingURL=authController.js.map