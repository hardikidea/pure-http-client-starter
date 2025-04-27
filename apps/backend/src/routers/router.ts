import express, { Request, Response } from 'express';

import { HttpRequest, toHttpRequest } from '../http/request';
import { errorHandlingHandler } from './middleware/error-handling';
import { ErrorMiddleware, Middleware } from './middleware';

export type ExpressHandler = (req: Request, res: Response) => void | Promise<void>;
export type HttpHandler = (request: HttpRequest, response: Response) => void | Promise<void>;

interface AddRouteOptions {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'connect' | 'trace';
  path: string;
  handler: HttpHandler;
  middleware?: Middleware;
}

export class Router {
  constructor(private expressRouter = express.Router()) {}

  public get expressRouterInstance(): express.Router {
    return this.expressRouter;
  }

  addMiddleware(middleware: Middleware | ErrorMiddleware) {
    this.expressRouter.use(middleware);
  }

  get(path: string, handler: HttpHandler, middleware?: Middleware) {
    this.addRoute({ method: 'get', path, handler, middleware });
  }

  post(path: string, handler: HttpHandler, middleware?: Middleware) {
    this.addRoute({ method: 'post', path, handler, middleware });
  }

  put(path: string, handler: HttpHandler, middleware?: Middleware) {
    this.addRoute({ method: 'put', path, handler, middleware });
  }

  delete(path: string, handler: HttpHandler, middleware?: Middleware) {
    this.addRoute({ method: 'delete', path, handler, middleware });
  }

  use(...routers: Array<Router>) {
    routers.forEach((router) => this.expressRouter.use(router.expressRouter));
  }

  private addRoute({ method, path, handler, middleware }: AddRouteOptions) {
    const handlers = [];
    if (middleware) {
      handlers.push(middleware);
    }
    return this.expressRouter[method](
      path,
      ...handlers,
      errorHandlingHandler(wrapHandler(handler)),
    );
  }
}

export function wrapHandler(handler: HttpHandler) {
  return (request: Request, response: Response) => handler(toHttpRequest(request), response);
}
