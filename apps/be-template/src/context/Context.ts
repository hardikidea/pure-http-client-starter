import { UserService } from '../services/UserService';
import { ProductService } from '../services/ProductService';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { UserController } from '../controllers/UserController';
import { ProductController } from '../controllers/ProductController';
import { ValidationMiddleware } from '../middlewares/ValidationMiddleware';
import { LoggerMiddleware } from '../middlewares/LoggerMiddleware';
import { RequestIdMiddleware } from '../middlewares/RequestIdMiddleware';
import { WinstonLoggerMiddleware } from '../middlewares/WinstonLoggerMiddleware';

export class Context {
  validationMiddleware: ValidationMiddleware;

  loggerMiddleware: LoggerMiddleware;
  requestIdMiddleware: RequestIdMiddleware;

  userService: UserService;
  productService: ProductService;

  authMiddleware: AuthMiddleware;

  userController: UserController;
  productController: ProductController;
  winstonLoggerMiddleware: WinstonLoggerMiddleware;


  constructor() {
    this.validationMiddleware = ValidationMiddleware.create();
    this.winstonLoggerMiddleware = WinstonLoggerMiddleware.create();

    this.loggerMiddleware = LoggerMiddleware.create();
    this.requestIdMiddleware = RequestIdMiddleware.create();

    this.userService = UserService.create();
    this.productService = ProductService.create();

    this.authMiddleware = AuthMiddleware.create();

    this.userController = UserController.create(this);
    this.productController = ProductController.create(this);
  }

  static create(): Context {
    return new Context();
  }

  static createNull(): Context {
    let ctx = new Context();
    ctx.winstonLoggerMiddleware = WinstonLoggerMiddleware.createNull();

    ctx.validationMiddleware = ValidationMiddleware.createNull();

    ctx.loggerMiddleware = LoggerMiddleware.createNull();
    ctx.requestIdMiddleware = RequestIdMiddleware.createNull();

    ctx.userService = UserService.createNull();
    ctx.productService = ProductService.createNull();

    ctx.authMiddleware = AuthMiddleware.createNull();

    ctx.userController = UserController.createNull();
    ctx.productController = ProductController.createNull();

    return ctx;
  }
}
