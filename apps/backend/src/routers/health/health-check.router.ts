import { Router } from '../routers/router';
import { HealthController } from './health-controller';

export function healthRouter(
  healthController: HealthController = new HealthController(),
  router: Router = new Router(),
) {
  router.get('/health', healthController.health.bind(healthController));

  return router;
}
