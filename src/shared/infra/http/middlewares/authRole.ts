import { Request, Response, NextFunction } from 'express';
import AppError from '../../../errors/AppError';

type roles = 'ADM' | 'OWNER' | 'USER';

type returnedFunction = (
  request: Request,
  response: Response,
  next: NextFunction,
) => void;

export default function authRole(role: roles): returnedFunction {
  return (request: Request, response: Response, next: NextFunction): void => {
    const loggedUserRole = request.user.role;

    if (loggedUserRole !== role) {
      throw new AppError('Not allowed', 401);
    }

    next();
  };
}
