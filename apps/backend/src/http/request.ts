import { Request } from 'express';
import z, { objectOutputType, ZodObject, ZodRawShape, ZodType } from 'zod';

import { InvalidRequestError } from '../routers/middleware/invalid-request-error';

export type ReceivedBody<T extends ZodRawShape> = objectOutputType<
  T,
  ZodType<unknown, z.ZodTypeDef, unknown>,
  'passthrough' | 'strict' | 'strip'
>;

export function parse<T extends ZodRawShape>(data: unknown, schema: ZodObject<T>): ReceivedBody<T> {
  try {
    return schema.parse(data);
  } catch (e) {
    if (e instanceof z.ZodError) {
      throw new InvalidRequestError(e);
    }
    throw e;
  }
}

export interface HttpRequest {
  receiveBody<T extends ZodRawShape>(schema: ZodObject<T>): ReceivedBody<T>;

  receiveUrl<T extends ZodRawShape>(schema: ZodObject<T>): ReceivedBody<T>;

  receiveQuery<T extends ZodRawShape>(schema: ZodObject<T>): ReceivedBody<T>;
}

export type AuthenticatedHttpRequest = HttpRequest & { userId: string; tokenData?: string };

export function toHttpRequest(request: Request): HttpRequest {
  return {
    ...request,
    receiveBody<T extends ZodRawShape>(schema: ZodObject<T>) {
      return parse(request.body, schema);
    },
    receiveUrl<T extends ZodRawShape>(schema: ZodObject<T>) {
      return parse(request.params, schema);
    },
    receiveQuery<T extends ZodRawShape>(schema: ZodObject<T>) {
      return parse(request.query, schema);
    },
  };
}
