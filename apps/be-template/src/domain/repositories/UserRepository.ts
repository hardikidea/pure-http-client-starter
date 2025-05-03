import { User } from '../../domain/models/User';
import { BaseRepository } from '../../shared/bases/BaseRepository';
import { CreationAttributes } from 'sequelize';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  protected nullObject(): User {
    return User.build({ id: -1, name: 'Null', email: 'null@example.com' } as CreationAttributes<User>);
  }

  static create(): UserRepository {
    return new UserRepository();
  }

  static createNull(): UserRepository {
    return new UserRepository();
  }
}
