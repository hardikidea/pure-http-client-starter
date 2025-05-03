import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { ApiServer } from '../app/ApiServer';

describe('Product API', () => {
  const app = ApiServer.createNull(4000);

  it('GET /api/products', async () => {
    const res = await request(app['app']).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
