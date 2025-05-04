import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { Context } from '../context/Context';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.listUsers();
    res.json(users);
  }

  static create(context: Context): UserController {
    return new UserController(context.userService);
  }

  static createNull(): UserController {
    return new UserController(UserService.createNull());
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const data = req.body;
    res.status(201).json({ id: 'generated-id', ...data });
  }
}
