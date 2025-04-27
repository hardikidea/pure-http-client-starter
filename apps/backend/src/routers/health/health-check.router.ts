import { HealthController } from './health-controller';
import { Router } from '../router';

export function healthRouter(
  healthController: HealthController = new HealthController(),
  router: Router = new Router(),
) {
  router.get('/health', healthController.health.bind(healthController));

  return router;
}
