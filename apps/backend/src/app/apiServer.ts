import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { AddressInfo } from 'net';
import { ExpressWrapper } from '../infrastructure/express/expressWrapper';
import { Logger } from '../infrastructure/logger/logger';
import { mainRouter } from '../routers/mainRouter';
import { errorHandlerMiddleware } from '../middleware/errorHandlerMiddleware';

export class ServerNotStartedError extends Error {}
export class ServerStartError extends Error {}

export class ApiServer {
  private listener: ReturnType<Application['listen']>;
  private _running = false;
  public readonly SERVER_START_TIMEOUT_MS = 5000;

  constructor(private readonly _expressApp: Application = ExpressWrapper.create()) {
    this._setupMiddlewares();
    this._setupRouters();
    this._setupErrorHandling();
    this._setup404Handler();
  }

  public static create(expressApp?: Application): ApiServer {
    return new ApiServer(expressApp);
  }

  public static createNull(): ApiServer {
    return new ApiServer(ExpressWrapper.createNull());
  }

  public get app(): Application {
    return this._expressApp;
  }

  public get running(): boolean {
    return this._running;
  }

  public get port(): number {
    if (!this.listener) {
      throw new ServerNotStartedError('Server not started yet.');
    }
    return (this.listener.address() as AddressInfo).port;
  }

  public registerRouter(router: express.Router): void {
    this._expressApp.use(router);
  }

  public async shutdown(): Promise<void> {
    if (!this._running) {
      Logger.info('Server is already shutdown.');
      return;
    }

    this.listener.closeAllConnections();

    await new Promise<void>((resolve, reject) => {
      this.listener.close((err) => {
        if (err) {
          Logger.error('Error shutting down server:', err.message);
          reject(err);
          return;
        }
        this._running = false;
        Logger.info('Server shutdown successfully.');
        resolve();
      });
    });
  }

  public async start(port: string = this._getRandomPort()): Promise<void> {
    let serverStartTimeout: NodeJS.Timeout;

    await Promise.race([
      new Promise<void>((resolve) => {
        this.listener = this._expressApp.listen(port, () => {
          this._running = true;
          Logger.info(`Server listening on port ${port}`);
          clearTimeout(serverStartTimeout);
          resolve();
        });
      }),
      new Promise<void>((_, reject) => {
        serverStartTimeout = setTimeout(() => {
          reject(new ServerStartError('Server failed to start within timeout.'));
        }, this.SERVER_START_TIMEOUT_MS);
      }),
    ]);
  }

  private _setupMiddlewares(): void {
    this._expressApp.use(helmet());
    this._expressApp.use(express.json());
    this._expressApp.use(cors({ origin: process.env.CLIENT_ORIGIN }));
  }

  private _setupErrorHandling(): void {
    this._expressApp.use(errorHandlerMiddleware);
    this._expressApp.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      Logger.error('Unhandled error:', err.message, err.stack);
      if (res.headersSent) {
        return;
      }
      res.status(502).json({ error: 'Bad Gateway', message: err.message });
    });
  }

  private _setup404Handler(): void {
    this._expressApp.all('*', (_req, res) => {
      res.status(404).send();
    });
  }

  private _getRandomPort(): string {
    return (Math.floor(Math.random() * 1000) + 3000).toString();
  }

  private _setupRouters() {
    this.registerRouter(mainRouter);
  }
}
