import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;  // Extend the Request interface to include `user`
    }
  }
}
