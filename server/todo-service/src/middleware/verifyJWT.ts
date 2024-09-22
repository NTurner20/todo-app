import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define an interface for the JWT payload (decoded token)
interface JwtPayload {
  id: string;
  user_name: string;
  iat: number;
  exp: number;
}

// Middleware to verify JWT
const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  
  const token = req.header('token')

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Attach the decoded token (with userId) to the request object
    const decodedToken = decoded as JwtPayload;
    req.userId = decodedToken.id;  // Extend the Request type to include userId
    req.userName = decodedToken.user_name;
    next();
  });
};

export default verifyJWT;
