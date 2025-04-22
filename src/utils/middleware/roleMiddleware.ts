import {Request, Response, NextFunction}  from 'express';
import HttpException from '../api/httpException';
import { prisma } from '../../modules/user/service';

type Role = 'admin' | 'manager' | 'user';

export const roleMiddleware = (allowedRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {

      if(!req.user){
        throw new HttpException(401, "Unauthenticated")
      }

    const user= await prisma.user.findUnique({where:{email: req.user.email}});
    
    // user role
    if(!user){
      res.status(404).json({message:"User not found!"});
    }

    const userRole = req.user.role as Role;
    const hasPermission = allowedRoles.includes(userRole);
    if (!hasPermission) {
      return next(new HttpException(403, 'Insufficient permissions'));
    }
  } catch(error){
    throw new HttpException(403,"something went wrong!")
    }
  }
}   // allowedRoles : [admin, user].

    // allowedRoles (user.role).
    // ! -> throw error forbidden.
    
  

