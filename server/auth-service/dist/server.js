"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./config/database"));
// Initialize the app
const app = (0, express_1.default)();
// Enable CORS
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
// Middleware to parse JSON
app.use(express_1.default.json());
// Routes
app.use('/api', routes_1.default);
// Connect to the database
database_1.default.sync()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Error: ', err));
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
});
