import { describe, it, expect } from 'vitest';
import { AuthMiddleware } from '../../src/middlewares/AuthMiddleware';
import { Request, Response, NextFunction } from 'express';

describe('AuthMiddleware', () => {
  const middleware = AuthMiddleware.createNull();

  it('should call next()', () => {
    let nextCalled = false;
    const req = {} as Request;
    const res = {} as Response;
    const next: NextFunction = () => { nextCalled = true; };

    middleware.authenticate(req, res, next);
    expect(nextCalled).toBe(true);
  });
});
