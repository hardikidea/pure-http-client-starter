import { errorHandlingHandler } from './error-handling';
import { InvalidRequestError } from './invalid-request-error';
import { ZodError } from 'zod';
import { Request, Response } from 'express';
import { testResponse } from '../../test/test-helpers/new-test-response';


describe('ErrorHandling', () => {
  it('does nothing when no error', () => {
    const handler = errorHandlingHandler((_request: Request, response: Response) => {
      response.send();
    });
    const response = testResponse();
    handler({} as Request, response);
    expect(response.statusCode).toEqual(200);
  });

  it('sends 400 with validation error', () => {
    const handler = errorHandlingHandler(() => {
      throw new InvalidRequestError(new ZodError([]));
    });
    const response = testResponse();
    handler({} as Request, response);
    expect(response.statusCode).toEqual(400);
  });
});
