import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import AppError from '../../../errors/AppError';

const limiter = () => {
  const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  });

  const limiterInstance = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 10, // 10 requests
    duration: 5, // per 5 second by IP
  });

  return limiterInstance;
};

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }

  try {
    await limiter().consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}
