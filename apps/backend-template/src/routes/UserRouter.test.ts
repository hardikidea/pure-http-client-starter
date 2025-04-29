import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { App } from '../../src/app/App';

describe('User API', () => {
  const app = App.createNull(4000);

  it('GET /api/users', async () => {
    const res = await request(app['app']).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
