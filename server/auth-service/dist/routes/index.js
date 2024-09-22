"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes")); // Import your specific routes
const router = (0, express_1.Router)();
// Use authentication routes
router.use('/auth', authRoutes_1.default); // Set up your routes
exports.default = router;
