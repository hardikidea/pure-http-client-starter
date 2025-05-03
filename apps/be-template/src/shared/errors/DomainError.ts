export abstract class DomainError extends Error {
  readonly type: string;
  readonly statusCode: number;
  readonly details?: unknown;

  constructor(message: string, type: string, statusCode = 400, details?: unknown) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
  }
}
