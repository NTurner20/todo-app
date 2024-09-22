// Extend the Express Request interface to include userId
declare namespace Express {
    export interface Request {
      userId?: string;
      userName?: string;
    }
  }
  