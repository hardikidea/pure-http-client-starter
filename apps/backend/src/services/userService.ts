// apps/backend/src/services/userService.ts

import { UserRepository } from '../repositories/userRepository/userRepository';
import { User } from '../models/user';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async listUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findUser(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  async createUser(data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    return this.userRepository.create(data as Optional<User, NullishPropertiesOf<User>>);
  }

  async updateUser(id: string, data: { name?: string; email?: string }): Promise<User> {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async bulkCreateUsers(data: Optional<User, NullishPropertiesOf<User>>[]): Promise<User[]> {
    return this.userRepository.bulkCreate(data);
  }

  async bulkUpdateUsers(
    data: { id: string; updates: { name?: string; email?: string } }[],
  ): Promise<User[]> {
    return this.userRepository.bulkUpdate(data);
  }

  async bulkDeleteUsers(ids: string[]): Promise<void> {
    await this.userRepository.bulkDelete(ids);
  }

  async upsertUser(data: Optional<User, NullishPropertiesOf<User>>): Promise<User> {
    return this.userRepository.upsert(data);
  }

  // Factory methods XP style
  static create(): UserService {
    return new UserService(UserRepository.create());
  }

  static createNull(): UserService {
    return new UserService(UserRepository.createNull());
  }
}
