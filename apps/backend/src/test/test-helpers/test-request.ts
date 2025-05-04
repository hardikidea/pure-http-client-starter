import EventEmitter from 'stream';
import { Request } from 'express';

export const buildTestRequest = (reqOptions?: {
  params?: unknown;
  body?: unknown;
  headers?: Record<string, string>;
}): { req: Request; eventEmitter: EventEmitter } => {
  const { params, body, headers } = reqOptions || { params: {}, body: {}, headers: {} };
  const requestEventEmitter = new EventEmitter();
  const req = {
    params,
    body,
    headers,
    on: requestEventEmitter.on.bind(requestEventEmitter),
  } as unknown as Request;

  return { req, eventEmitter: requestEventEmitter };
};
