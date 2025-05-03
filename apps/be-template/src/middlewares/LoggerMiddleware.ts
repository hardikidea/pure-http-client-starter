import { Request, Response, NextFunction } from 'express';

export class LoggerMiddleware {
  logRequest(req: Request, _res: Response, next: NextFunction): void {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} [id: ${req.headers['x-request-id']}]`);
    next();
  }

  static create(): LoggerMiddleware {
    return new LoggerMiddleware();
  }

  static createNull(): LoggerMiddleware {
    return new LoggerMiddleware();
  }
}
