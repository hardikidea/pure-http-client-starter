import { Request, Response } from 'express';
import { InvalidRequestError } from './invalid-request-error';
import { ExpressHandler } from '../router';
import ServiceException from '../../exception/service.exception';

export function errorHandlingHandler(handler: ExpressHandler): ExpressHandler {
  return async (request: Request, response: Response) => {
    try {
      return await handler(request, response);
    } catch (error) {
      if (error instanceof InvalidRequestError) {
        response.status(400).send({ message: error.message, reasons: error.reasons });
        return;
      }

      if (error instanceof ServiceException) {
        response
          .status(422)
          .send({ message: error.message, reasons: error.message, code: error.code });
        return;
      }
      throw error;
    }
  };
}
