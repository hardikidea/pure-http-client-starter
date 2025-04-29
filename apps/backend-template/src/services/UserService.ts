import { UserRepository } from '../domain/repositories/UserRepository';
import { User } from '../domain/models/User';
import { BaseService } from '../shared/bases/BaseService';

export class UserService extends BaseService<UserRepository, User> {
  async listUsers(): Promise<User[]> {
    return this.repository.findAll();
  }

  static create(): UserService {
    return new UserService(UserRepository.create());
  }

  static createNull(): UserService {
    return new UserService(UserRepository.createNull());
  }
}
