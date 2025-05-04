import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Context } from '../context/Context';
import { UserSchema } from '../shared/schemas/UserSchema';
import { ValidationMiddleware } from '../middlewares/ValidationMiddleware';

export class UserRouter {
  readonly router: Router;

  constructor(userController: UserController, authMiddleware: AuthMiddleware) {
    this.router = Router();

    /**
     * @openapi
     * /users:
     *   get:
     *     tags:
     *       - Users
     *     summary: Get all users
     *     responses:
     *       200:
     *         description: Successful response
     */
    this.router.get(
      '/users',
      authMiddleware.authenticate.bind(authMiddleware),
      ValidationMiddleware.body(UserSchema),
      userController.getAllUsers.bind(userController),
    );
  }

  static create(context: Context): UserRouter {
    return new UserRouter(context.userController, context.authMiddleware);
  }

  static createNull(): UserRouter {
    return new UserRouter(UserController.createNull(), AuthMiddleware.createNull());
  }
}
