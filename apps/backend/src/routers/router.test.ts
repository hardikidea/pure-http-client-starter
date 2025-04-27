import { Router } from './router';
import express from 'express';

const emptyHandler = () => {};

describe('Router', () => {
  it('adds get route', () => {
    const router = new Router();
    router.get('/test', emptyHandler);
    assertAddRoute(router, { method: 'get', path: '/test' });
  });

  it('adds post route', () => {
    const router = new Router();
    router.post('/test', emptyHandler);
    assertAddRoute(router, { method: 'post', path: '/test' });
  });

  it('adds put route', () => {
    const router = new Router();
    router.put('/test', emptyHandler);
    assertAddRoute(router, { method: 'put', path: '/test' });
  });

  it('adds delete route', () => {
    const router = new Router();
    router.delete('/test', emptyHandler);
    assertAddRoute(router, { method: 'delete', path: '/test' });
  });

  it('should add middlewares and handler functions for route', async () => {
    const expressRouter = express.Router();
    const router = new Router(expressRouter);
    const emptyMiddleware = () => Promise.resolve();

    router.get('/test', emptyHandler, emptyMiddleware);

    expect(expressRouter.stack).toHaveLength(1);
    expect(expressRouter.stack[0]!.route!.stack).toHaveLength(2);
  });
});

function assertAddRoute(router: Router, { method, path }: { method: string; path: string }) {
  const stack = router.expressRouterInstance.stack;
  expect(stack).toHaveLength(1);
  const route = stack[0]!.route!;
  expect(route.path).toEqual(path);
  expect(route.methods).toEqual({ [method]: true });
}
