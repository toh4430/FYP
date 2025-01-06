import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        res.status(401);
        throw new Error('User not found');
      }

      req.user = user;
      next();
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  } catch (error) {
    res.status(401);
    next(new Error('Not authorized'));
  }
};

