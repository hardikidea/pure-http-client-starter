// apps/backend/tests/app/apiServer.test.ts

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ApiServer, ServerNotStartedError } from '../../../src/app/apiServer';
import request from 'supertest'; // For real HTTP calls

let server: ApiServer;

describe('ApiServer', () => {
  beforeEach(() => {
    server = ApiServer.create();
  });

  afterEach(async () => {
    if (server.running) {
      await server.shutdown();
    }
  });

  it('starts and listens on a port', async () => {
    await server.start();
    expect(server.running).toBe(true);
    expect(server.port).toBeGreaterThan(0);
  });

  it('throws error if accessing port before server starts', () => {
    expect(() => server.port).toThrow(ServerNotStartedError);
  });

  it('shuts down the server cleanly', async () => {
    await server.start();
    expect(server.running).toBe(true);

    await server.shutdown();
    expect(server.running).toBe(false);
  });

  it('returns 404 for unknown route', async () => {
    await server.start();

    await request(server.app).get('/some-unknown-route').expect(404);
  });

  // Bonus Test: Timeout if server doesn't start (not needed now unless implementing slow server simulation)
});
