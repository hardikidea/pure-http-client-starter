import { describe, it, expect } from 'vitest';
import { ErrorHandlerMiddleware } from '../../src/middlewares/ErrorHandlerMiddleware';
import { Request, Response, NextFunction } from 'express';

describe('ErrorHandlerMiddleware', () => {
  const middleware = ErrorHandlerMiddleware.createNull();

  it('should respond with 500 error', () => {
    const error = new Error('Something broke');
    const req = {} as Request;
    const res = {
      status(code: number) {
        expect(code).toBe(500);
        return this;
      },
      json(payload: any) {
        expect(payload.message).toBe('Something broke');
      }
    } as unknown as Response;
    const next = {} as NextFunction;

    middleware.handle(error, req, res, next);
  });
});
