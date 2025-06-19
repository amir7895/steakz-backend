"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const menuRoutes_1 = __importDefault(require("./routes/menuRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
const staffRoutes_1 = __importDefault(require("./routes/staffRoutes"));
const financialRoutes_1 = __importDefault(require("./routes/financialRoutes"));
const analyticsRoutes_1 = __importDefault(require("./routes/analyticsRoutes"));
const feedbackRoutes_1 = __importDefault(require("./routes/feedbackRoutes"));
const loyaltyRoutes_1 = __importDefault(require("./routes/loyaltyRoutes"));
const attendanceRoutes_1 = __importDefault(require("./routes/attendanceRoutes"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const seedAdmin_1 = require("./utils/seedAdmin");
const client_1 = require("@prisma/client");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const port = 3001;
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((req, _, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});
app.get('/', (_req, res) => {
    res.send('Welcome to the homepage!');
});
app.get('/debug-users', async (_req, res) => {
    const users = await prisma.user.findMany({
        select: { id: true, username: true, password: true, role: true }
    });
    res.json(users);
});
app.use('/api/users', userRoutes_1.default);
app.use('/api/posts', postRoutes_1.default);
app.use('/api/comments', commentRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/api/menu', menuRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/inventory', inventoryRoutes_1.default);
app.use('/api/staff', staffRoutes_1.default);
app.use('/api/financial', financialRoutes_1.default);
app.use('/api/analytics', analyticsRoutes_1.default);
app.use('/api/feedback', feedbackRoutes_1.default);
app.use('/api/loyalty', loyaltyRoutes_1.default);
app.use('/api/attendance', attendanceRoutes_1.default);
app.use('/api/reservations', reservationRoutes_1.default);
app.use(errorMiddleware_1.errorHandler);
let server;
Promise.all([(0, seedAdmin_1.seedAdminUser)(), (0, seedAdmin_1.seedManagerUser)()])
    .then(() => {
    exports.server = server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error('Failed to seed users:', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map