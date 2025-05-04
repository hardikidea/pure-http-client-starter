import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { mainRouter } from './mainRouter';

let app;

describe('UserRouter', () => {
  beforeEach(async () => {
    // server = ApiServer.createNull(stubbRouter );
    // server.registerRouter(UserRouter.createNull().expressRouterInstance);
    app = express();
    app.use(mainRouter);
  });

  it('should create a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com' });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Test User');
  });

  it('should list users', async () => {
    await request(app).post('/users').send({ name: 'User One', email: 'one@example.com' });

    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should find a user by id', async () => {
    const created = await request(app)
      .post('/users')
      .send({ name: 'FindMe', email: 'findme@example.com' });

    const res = await request(app).get(`/users/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('FindMe');
  });

  it('should update a user', async () => {
    const created = await request(app)
      .post('/users')
      .send({ name: 'UpdateMe', email: 'updateme@example.com' });

    const res = await request(app).patch(`/users/${created.body.id}`).send({ name: 'UpdatedName' });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('UpdatedName');
  });

  it('should delete a user', async () => {
    const created = await request(app)
      .post('/users')
      .send({ name: 'DeleteMe', email: 'deleteme@example.com' });

    const res = await request(app).delete(`/users/${created.body.id}`);
    expect(res.status).toBe(204);
  });

  it('should upsert a user', async () => {
    const res = await request(app)
      .post('/users/upsert')
      .send({ name: 'Upserted', email: 'upserted@example.com' });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Upserted');
  });
});
