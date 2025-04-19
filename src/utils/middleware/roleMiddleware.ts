import { Request, Response, NextFunction } from 'express';
import  HttpException  from '../api/httpException';

type Role = 'admin' | 'manager' | 'user';

export const roleMiddleware = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if user exists in request (set by authMiddleware)
      if (!req.user) {
        throw new HttpException(401, 'Authentication required');
      }

      // Check if user's role is in allowed roles
      if (!allowedRoles.includes(req.user.role as Role)) {
        throw new HttpException(403, 'Insufficient permissions');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};