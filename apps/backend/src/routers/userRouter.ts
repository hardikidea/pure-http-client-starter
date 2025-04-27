import { Router } from 'express';
import { UserController } from '../controllers/userController';

export class UserRouter {
  private readonly router: Router;

  constructor(private readonly controller: UserController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get('/users', this.controller.listUsers.bind(this.controller));
    this.router.get('/users/:id', this.controller.findUser.bind(this.controller));
    this.router.post('/users', this.controller.createUser.bind(this.controller));
    this.router.patch('/users/:id', this.controller.updateUser.bind(this.controller));
    this.router.delete('/users/:id', this.controller.deleteUser.bind(this.controller));

    // Optional bulk endpoints
    this.router.post('/users/bulk', this.controller.bulkCreateUsers.bind(this.controller));
    this.router.patch('/users/bulk', this.controller.bulkUpdateUsers.bind(this.controller));
    this.router.delete('/users/bulk', this.controller.bulkDeleteUsers.bind(this.controller));

    // Upsert endpoint
    this.router.post('/users/upsert', this.controller.upsertUser.bind(this.controller));
  }

  public get expressRouterInstance(): Router {
    return this.router;
  }

  static create(): UserRouter {
    return new UserRouter(UserController.create());
  }

  static createNull(): UserRouter {
    return new UserRouter(UserController.createNull());
  }
}
