/* eslint-disable no-console */
import 'reflect-metadata';
import http from 'http';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import createConnection from '../typeorm';
import '../../container';
import routes from './routes';
import AppError from '../../errors/AppError';
import rateLimiter from './middlewares/rateLimiter';

const expressApp = express();
createConnection();
const app = http.createServer(expressApp);

expressApp.use(
  express.static(
    path.resolve(__dirname, '..', '..', '..', '..', 'public', 'docs'),
  ),
);
expressApp.use(rateLimiter);
expressApp.use(express.json());
expressApp.use(routes);

expressApp.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export { app };
