import { ApiServer, ServerNotStartedError, ServerStartError } from './api-server';

describe('ApiServer test', () => {
  let server: ApiServer;

  afterEach(async () => {
    await server.shutdown();
  });

  it('should create an instance of ApiServer', () => {
    server = ApiServer.createNull();
    expect(server).toBeInstanceOf(ApiServer);
  });

  it('should throw ServerNotStarted error if trying to get port before starting', () => {
    server = ApiServer.createNull();
    expect(() => server.port).toThrow(ServerNotStartedError);
  });

  it('should return the port if the server has been started', async () => {
    server = ApiServer.createNull();
    const startPort = Math.floor(Math.random() * 1000) + 3000;
    await server.start(startPort.toString());
    expect(server.port).toEqual(startPort.toString());
  });

  it('should start the server', async () => {
    server = ApiServer.createNull();
    await server.start();
    expect(server.running).toBe(true);
  });

  it('should throw server start error if the server takes longer than timeout to start', async () => {
    server = ApiServer.createNull({ startDelay: server.SERVER_START_TIMEOUT_MS + 100 });
    vi.useFakeTimers();
    const startPromise = server.start();
    vi.advanceTimersByTime(server.SERVER_START_TIMEOUT_MS);
    await expect(startPromise).rejects.toThrow(ServerStartError);
    vi.useRealTimers();
  });

  it('should shutdown the server', async () => {
    server = ApiServer.createNull();
    await server.start();
    await server.shutdown();
    expect(server.running).toBe(false);
  });
});
