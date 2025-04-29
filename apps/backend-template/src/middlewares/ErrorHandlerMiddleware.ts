import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/errors/AppError';
import { ZodError } from 'zod';
import { DomainError } from '../shared/errors/DomainError';
import { WinstonLogger } from '../shared/logger/WinstonLogger';

export class ErrorHandlerMiddleware {
  handle(error: Error, req: Request, res: Response, _next: NextFunction): void {
    WinstonLogger.error(error);

    // Convert ZodError to AppError
    if (error instanceof ZodError) {
      const formatted = new AppError(
        'Validation failed',
        'VALIDATION_ERROR',
        400,
        error.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message
        }))
      );
      return this.respond(res, formatted);
    }

    if (error instanceof AppError) {
      return this.respond(res, error);
    }

    if (error instanceof DomainError) {
      return this.respond(res, error);
    }

    const fallback = new AppError('Something went wrong', 'INTERNAL_ERROR', 500);
    return this.respond(res, fallback);
  }

  private respond(res: Response, err: AppError): void {
    res.status(err.statusCode).json({
      type: err.type,
      message: err.message,
      ...(err.details ? { details: err.details } : {})
    });
  }

  static create(): ErrorHandlerMiddleware {
    return new ErrorHandlerMiddleware();
  }

  static createNull(): ErrorHandlerMiddleware {
    return new ErrorHandlerMiddleware();
  }
}
