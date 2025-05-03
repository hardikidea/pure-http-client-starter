import { Request, Response, NextFunction } from 'express';
import { WinstonLogger } from '../shared/logger/WinstonLogger';

export class WinstonLoggerMiddleware {
  logRequest(req: Request, _res: Response, next: NextFunction): void {
    WinstonLogger.info(`[${req.method}] ${req.url} [id: ${req.headers['x-request-id']}]`);
    next();
  }

  static create(): WinstonLoggerMiddleware {
    return new WinstonLoggerMiddleware();
  }

  static createNull(): WinstonLoggerMiddleware {
    return new WinstonLoggerMiddleware();
  }
}
