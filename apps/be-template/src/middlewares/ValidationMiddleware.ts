import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';

export class ValidationMiddleware {
  static body(schema: ZodTypeAny) {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({
            message: 'Validation failed',
            errors: error.errors.map(e => ({
              path: e.path.join('.'),
              message: e.message
            }))
          });
        } else {
          next(error);
        }
      }
    };
  }

  static query(schema: ZodTypeAny) {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        schema.parse(req.query);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({
            message: 'Validation failed',
            errors: error.errors.map(e => ({
              path: e.path.join('.'),
              message: e.message
            }))
          });
        } else {
          next(error);
        }
      }
    };
  }

  static params(schema: ZodTypeAny) {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        schema.parse(req.params);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({
            message: 'Validation failed',
            errors: error.errors.map(e => ({
              path: e.path.join('.'),
              message: e.message
            }))
          });
        } else {
          next(error);
        }
      }
    };
  }

  static create(): ValidationMiddleware {
    return new ValidationMiddleware();
  }

  static createNull(): ValidationMiddleware {
    return new ValidationMiddleware();
  }
}
