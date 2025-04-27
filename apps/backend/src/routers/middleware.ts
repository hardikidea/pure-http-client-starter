import { AsyncRequestHandler } from '../types';
import { NextFunction, Request, Response } from 'express';

export type Middleware = AsyncRequestHandler;
export type ErrorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<void>;
