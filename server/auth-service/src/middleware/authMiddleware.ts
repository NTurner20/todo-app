import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('token')
    if (!token){
        res.status(401).json({error: 'No token, authorization denied'});
    } else {
        try {
            const decoded = verifyToken(token);
            req.user = decoded;
            next()
        } catch (error) {
            res.status(401).json({ error: 'Invalid token'})
        }
    }
}