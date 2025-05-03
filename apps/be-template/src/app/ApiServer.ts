import express, { Application } from 'express';
import { UserRouter } from '../routes/UserRouter';
import { ProductRouter } from '../routes/ProductRouter';
import { ErrorHandlerMiddleware } from '../middlewares/ErrorHandlerMiddleware';
import { Context } from '../context/Context';
import { setupSwagger } from '../docs/swagger';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


export class ApiServer {
  private readonly app: Application;
  private readonly port: number;
  private readonly context: Context;

  constructor(port: number, context: Context) {
    this.app = express();
    this.port = port;
    this.context = context;

    this.app.use(this.context.requestIdMiddleware.assignId.bind(this.context.requestIdMiddleware));
    this.app.use(this.context.winstonLoggerMiddleware.logRequest.bind(this.context.winstonLoggerMiddleware)); // <<< use Winston log

    this.app.use(this.context.loggerMiddleware.logRequest.bind(this.context.loggerMiddleware));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json({ limit: '10kb' }));
    this.app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100
      })
    );

    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    setupSwagger(this.app as express.Express); // 👈 Add this line // 👈 Add this line
  }

  private setupRoutes(): void {
    this.app.use('/api', UserRouter.create(this.context).router);
    this.app.use('/api', ProductRouter.create(this.context).router);
  }

  private setupErrorHandling(): void {
    const errorHandler = ErrorHandlerMiddleware.create();
    this.app.use(errorHandler.handle.bind(errorHandler));
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }

  static create(port: number): ApiServer {
    const context = Context.create();
    return new ApiServer(port, context);
  }

  static createNull(port: number): ApiServer {
    const context = Context.createNull();
    return new ApiServer(port, context);
  }
}
