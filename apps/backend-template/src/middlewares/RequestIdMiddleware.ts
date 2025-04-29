import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export class RequestIdMiddleware {
  assignId(req: Request, _res: Response, next: NextFunction): void {
    req.headers['x-request-id'] = req.headers['x-request-id'] || uuidv4();
    next();
  }

  static create(): RequestIdMiddleware {
    return new RequestIdMiddleware();
  }

  static createNull(): RequestIdMiddleware {
    return new RequestIdMiddleware();
  }
}
