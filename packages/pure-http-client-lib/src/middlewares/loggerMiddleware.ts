import { HttpRequestOptions } from '../PureHttpClientManager';

export const loggerMiddleware = (request: HttpRequestOptions): HttpRequestOptions => {
  console.log(`[LoggerMiddleware] ${request.method} ${request.url}`);
  return request;
};
