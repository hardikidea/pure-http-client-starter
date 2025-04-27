// apps/backend/src/controllers/userController.ts

import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { createUserSchema, updateUserSchema } from '../validators/userValidator';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async listUsers(_req: Request, res: Response): Promise<void> {
    const users = await this.userService.listUsers();
    res.status(200).json(users);
  }

  async findUser(req: Request, res: Response): Promise<void> {
    const user = await this.userService.findUser(req.params.id);
    res.status(200).json(user);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const validated = createUserSchema.parse(req.body);
    const user = await this.userService.createUser(validated);
    res.status(201).json(user);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const validated = updateUserSchema.parse(req.body);
    const user = await this.userService.updateUser(req.params.id, validated);
    res.status(200).json(user);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    await this.userService.deleteUser(req.params.id);
    res.status(204).send();
  }

  // Bulk methods (if needed)
  async bulkCreateUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.bulkCreateUsers(req.body);
    res.status(201).json(users);
  }

  async bulkUpdateUsers(req: Request, res: Response): Promise<void> {
    const updates = await this.userService.bulkUpdateUsers(req.body);
    res.status(200).json(updates);
  }

  async bulkDeleteUsers(req: Request, res: Response): Promise<void> {
    await this.userService.bulkDeleteUsers(req.body.ids);
    res.status(204).send();
  }

  async upsertUser(req: Request, res: Response): Promise<void> {
    const user = await this.userService.upsertUser(req.body);
    res.status(200).json(user);
  }

  // Factory methods XP style
  static create(): UserController {
    return new UserController(UserService.create());
  }

  static createNull(): UserController {
    return new UserController(UserService.createNull());
  }
}
