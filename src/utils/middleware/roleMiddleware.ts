import {Request, Response, NextFunction}  from 'express';
import HttpException from '../api/httpException';

type Role = 'admin' | 'manager' | 'user';

export const roleMiddleware = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new HttpException(401, 'Authentication required');
      }

      const userRole = (req.user.role as string).toLowerCase().trim() as Role;

      if (!allowedRoles.includes(userRole)) {
        console.warn(`Access denied: ${userRole} not in ${allowedRoles.join(', ')}`);
        throw new HttpException(403, 'Permission denied');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
