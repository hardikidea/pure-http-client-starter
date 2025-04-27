import { BaseRepository } from '../baseRepository';
import { User } from '../../models/user';
import { UserNotFoundException } from '../../exceptions/userNotFoundException';
import { StubbedUserRepository } from './stubbedUserRepository';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';

export class UserRepository implements BaseRepository<User> {
  async findAll(): Promise<User[]> {
    return User.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

 async create(data: Optional<User, NullishPropertiesOf<User>>): Promise<User> {
   return User.create(data);
 }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    await user.update(data);
    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    await user.destroy();
  }
async bulkCreate(data: Optional<User, NullishPropertiesOf<User>>[]): Promise<User[]> {
  return User.bulkCreate(data);
}

  async bulkUpdate(data: { id: string; updates: Partial<User> }[]): Promise<User[]> {
    const updatedUsers: User[] = [];
    for (const { id, updates } of data) {
      const user = await this.findById(id);
      await user.update(updates);
      updatedUsers.push(user);
    }
    return updatedUsers;
  }

  async bulkDelete(ids: string[]): Promise<void> {
    await User.destroy({ where: { id: ids } });
  }

async upsert(data: Optional<User, NullishPropertiesOf<User>>): Promise<User> {
  const [user] = await User.upsert(data, { returning: true });
  return user;
}

  // XP Factory Methods
  static create(): UserRepository {
    return new UserRepository();
  }

  static createNull(): StubbedUserRepository {
    return new StubbedUserRepository();
  }
}
