// apps/backend/src/middleware/errorHandlerMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { Logger } from '../infrastructure/logger/logger';

export function errorHandlerMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  Logger.error('Unhandled error:', err.message, err.stack);

  if (res.headersSent) {
    return;
  }

  res.status(502).json({ error: 'Bad Gateway', message: err.message });
}
