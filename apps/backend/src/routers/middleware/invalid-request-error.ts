import { ZodError } from 'zod';

export class InvalidRequestError extends Error {
  constructor(private validationError: ZodError) {
    super();
  }

  message = 'Invalid Request';

  get reasons() {
    return this.validationError.errors.map((e) => ({ path: e.path, message: e.message }));
  }
}
