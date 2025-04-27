// apps/backend/tests/routers/healthRouter.test.ts

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import { healthRouter } from '../../../src/routers/healthRouter';

describe('healthRouter', () => {
  const app = express();
  app.use('/', healthRouter);

  it('responds 200 OK on GET /health', async () => {
    await request(app).get('/health').expect(200).expect('Content-Type', /json/);
  });

  it('returns { status: "ok" } in /health response body', async () => {
    const res = await request(app).get('/health');
    expect(res.body).toEqual({ status: 'ok' });
  });
});
