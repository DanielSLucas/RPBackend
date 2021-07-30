import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRoles } from 'modules/users/infra/typeorm/entities/User';
import AppError from '../../../errors/AppError';

import authConfig from '../../../../config/auth';

interface TokenPayload {
  role: UsersRoles;
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { role, sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
      role,
    };

    return next();
  } catch (err) {
    throw new AppError('invalid JWT token', 401);
  }
}
