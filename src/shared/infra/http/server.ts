/* eslint-disable no-unused-vars */
import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container'

import cors from 'cors';
import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import { errors } from 'celebrate';
import rateLimiter from './middlewares/rateLimiter';

const app = express();
app.use(cors());
app.use(express.json());
// app.use(rateLimiter);
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

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


app.listen(3333);

console.log('running 3333');
