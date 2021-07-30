import { Request, Response, NextFunction } from 'express';
import { UsersRoles } from '../../../../modules/users/infra/typeorm/entities/User';
import AppError from '../../../errors/AppError';

type returnedFunction = (
  request: Request,
  response: Response,
  next: NextFunction,
) => void;

export default function authRole(role: UsersRoles): returnedFunction {
  return (request: Request, response: Response, next: NextFunction): void => {
    const loggedUserRole = request.user.role;

    if (loggedUserRole !== role) {
      throw new AppError('Not allowed', 401);
    }

    next();
  };
}
