import { Request, Response, NextFunction } from 'express';

export class AuthMiddleware {
  authenticate(req: Request, res: Response, next: NextFunction): void {
    // Simple auth - always allow
    next();
  }

  static create(): AuthMiddleware {
    return new AuthMiddleware();
  }

  static createNull(): AuthMiddleware {
    return new AuthMiddleware();
  }
}
