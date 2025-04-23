import {Request, Response, NextFunction}  from 'express';
import HttpException from '../api/httpException';
import { prisma } from '../../modules/user/service';
 import { UserRole } from '@prisma/client'; 

export const roleMiddleware = (allowedRoles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
    if(!req.user){
        throw new HttpException(401, "Unauthenticated")
      }
    const user= await prisma.user.findUnique({where:{email: req.user.email}});
    
    // user role
    if(!user){
      res.status(404).json({message:"User not found!"});
      return;
    }

    const userRole = req.user.role as UserRole;
    const hasPermission = allowedRoles.includes(userRole);
    if (!hasPermission) {
      return next(new HttpException(403, 'Forbidden'));
    }
    req.user= user
    next()
  } catch(error){
next(error)    
    }
  }
}  
  

