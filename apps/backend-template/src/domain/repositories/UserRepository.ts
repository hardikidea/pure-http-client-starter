import { User } from '../models/User';
import { BaseRepository } from '../../shared/bases/BaseRepository';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  protected nullObject(): User {
    return User.build({ id: 'null', name: '' });
  }

  static create(): UserRepository {
    return new UserRepository();
  }

  static createNull(): UserRepository {
    return new UserRepository();
  }
}
