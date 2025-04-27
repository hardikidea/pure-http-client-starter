import 'newrelic';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { AddressInfo } from 'net';

import env from '../env';
import logger from '../loggers/logger';
import { Router } from '../routers/router';

export class ServerNotStartedError extends Error {}

export class ServerStartError extends Error {}

export class ApiServer {
  private listener: ReturnType<express.Express['listen']> | undefined;
  private _running = false;
  public readonly SERVER_START_TIMEOUT_MS = 5000;

  constructor(
    routers: Array<Router> = [],
    private _expressApp: express.Express = express(),
  ) {
    this._expressApp.use(helmet());
    this._expressApp.use(express.json());
    this._expressApp.use(cors({ origin: env.CLIENT_ORIGIN }));

    for (const router of routers) {
      this.registerRouter(router);
    }

    this._expressApp.use(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        logger.error(`Unhandled error:`, err.message, err.stack);
        if (res.headersSent) {
          return;
        }
        res.status(502).json({ error: `Bad Gateway`, message: err.message });
      },
    );

    this._expressApp.all('*', (_req, res) => {
      res.status(404).send();
    });
  }

  public static create(
    { routers }: { routers?: Array<Router> },
    expressApp?: express.Express,
  ): ApiServer {
    return new ApiServer(routers, expressApp);
  }

  public static createNull(opts?: StubbedExpressOptions): ApiServer {
    return new ApiServer([], StubbedExpress.create(opts));
  }

  public get app(): express.Express {
    return this._expressApp;
  }

  public get port(): number {
    if (!this.listener) {
      throw new ServerNotStartedError('Server not started');
    }
    return (this.listener.address() as AddressInfo).port;
  }

  public get running(): boolean {
    return this._running;
  }

  public registerRouter(router: Router): void {
    this._expressApp.use(router.expressRouterInstance);
  }

  public async shutdown(): Promise<void> {
    if (this._running === false) {
      logger.info('Server is already shutdown');
      return;
    }
    this.listener!.closeAllConnections();
    await new Promise<void>((resolve, reject) => {
      this.listener!.close((err) => {
        if (err) {
          logger.error('Error shutting down server:', err);
          reject(err);
          return;
        }
        this._running = false;
        logger.info('Server has successfully been shutdown');
        resolve();
      });
    });
  }

  private getRandomPort(): string {
    return (Math.floor(Math.random() * 1000) + 3000).toString();
  }

  public async start(port: string = this.getRandomPort()): Promise<void> {
    let serverStartTimeout: NodeJS.Timeout;

    await Promise.race([
      new Promise<void>((res) => {
        this.listener = this._expressApp.listen(port, () => {
          this._running = true;
          logger.info(`Server listening on port ${port}`);
          clearTimeout(serverStartTimeout);
          res();
        });
      }),
      new Promise<void>((_, rej) => {
        serverStartTimeout = setTimeout(() => {
          rej(new ServerStartError('Server failed to start'));
        }, this.SERVER_START_TIMEOUT_MS);
      }),
    ]);
  }
}

interface StubbedExpressOptions {
  startDelay: number;
}

class StubbedExpress {
  private port: string | undefined;

  constructor(private opts: StubbedExpressOptions = { startDelay: 0 }) {}

  public static create(opts?: StubbedExpressOptions): express.Express {
    return new StubbedExpress(opts) as unknown as express.Express;
  }

  public use(): void {}

  public all(): void {}

  public listen(port: string, cb: () => void): ReturnType<express.Express['listen']> {
    this.port = port;

    setTimeout(cb, this.opts.startDelay);

    return {
      close: (closeCb: () => void) => closeCb(),
      closeAllConnections: () => {},
      address: () => ({ port: this.port }),
    } as unknown as ReturnType<express.Express['listen']>;
  }
}
