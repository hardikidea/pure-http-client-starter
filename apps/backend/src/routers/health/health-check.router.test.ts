import { testApiServer } from '../test-helpers/app-request-test-support';
import { healthRouter } from './health-check.router';
import { HealthController } from './health-controller';
import { expect } from 'vitest';

describe('health check router', () => {
  it('returns 200 when database is up', async () => {
    const client = testApiServer(
      healthRouter(
        HealthController.createNull({
          isDatabaseUP: true,
        }),
      ),
    );
    const response = await client.get('/health');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      status: 'UP',
    });
  });

  it('returns 500 when database is not up', async () => {
    const client = testApiServer(
      healthRouter(
        HealthController.createNull({
          isDatabaseUP: false,
        }),
      ),
    );
    const response = await client.get('/health');
    expect(response.status).toEqual(500);
    expect(response.body).toEqual({
      status: 'DOWN',
    });
  });
});
