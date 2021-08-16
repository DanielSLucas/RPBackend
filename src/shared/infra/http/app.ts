/* eslint-disable no-console */
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import createConnection from '../typeorm';
import '../../container';
import routes from './routes';
import AppError from '../../errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import swaggerFile from '../../../swagger.json';

const app = express();
createConnection();

app.use(rateLimiter);
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
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
});

export { app };
