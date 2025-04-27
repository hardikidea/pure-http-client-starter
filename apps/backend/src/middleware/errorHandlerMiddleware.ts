import { Request, Response, NextFunction } from 'express';
import { Logger } from '../infrastructure/logger/logger';
import { BaseException } from '../exceptions/baseException';

interface ErrorHandlerMiddlewareParams {
  err: Error;
  _req: Request;
  res: Response;
  _next: NextFunction;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandlerMiddleware({ err, res }: ErrorHandlerMiddlewareParams): void {
  Logger.error('Unhandled error:', err.message, err.stack);

  if (res.headersSent) {
    return;
  }

  if (err instanceof BaseException) {
    res.status(err.statusCode).json({ error: err.name, message: err.message });
    return;
  }

  res.status(502).json({ error: 'Bad Gateway', message: err.message });
}
