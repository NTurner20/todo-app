"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../config/jwt");
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'No token, authorization denied' });
    }
    else {
        try {
            const decoded = (0, jwt_1.verifyToken)(token);
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    }
};
exports.authenticate = authenticate;
