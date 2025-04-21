import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import  HttpException  from '../api/httpException';

// Define token payload type
interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}



export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException(401, 'Authentication required');
    }
    
    const token = authHeader.split(' ')[1];
  
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    
    // Add user to request object
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new HttpException(401, 'Invalid or expired token'));
    } else {
      next(error);
    }
  }
};

// Generate JWT token
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new HttpException(401, 'Invalid or expired token');
  }
};