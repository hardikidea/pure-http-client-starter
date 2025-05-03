export class AppError extends Error {
  readonly type: string;
  readonly statusCode: number;
  readonly details?: unknown;

  constructor(message: string, type = 'INTERNAL_ERROR', statusCode = 500, details?: unknown) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
  }
}
