import { Router } from './router';
import { healthRouter } from './health/health-check.router';

export function routes(): Router {
  const router = new Router();
  router.use(healthRouter());
  return router;
}
