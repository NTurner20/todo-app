"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jwt_1 = require("../config/jwt");
// register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await user_1.default.create({ name, email, password: hashedPassword });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: 'Login Failed' });
    }
};
exports.register = register;
// login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_1.default.findOne({ where: { email } });
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            res.status(401).json({ error: 'Invalid credentials' });
        }
        else {
            const token = (0, jwt_1.generateToken)(user);
            res.json({ token });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Login Failed' });
    }
};
exports.login = login;
