import { BaseRepository } from '../baseRepository';
import { User } from '../../models/user';
import { UserNotFoundException } from '../../exceptions/userNotFoundException';

export class StubbedUserRepository implements BaseRepository<User> {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  async create(data: Partial<User>): Promise<User> {
    const newUser = {
      id: Math.random().toString(36).substring(2, 15),
      ...data,
    } as User;
    this.users.push(newUser);
    return newUser;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, data);
    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    this.users = this.users.filter((u) => u.id !== user.id);
  }

  async bulkCreate(data: Partial<User>[]): Promise<User[]> {
    const created = data.map((d) => ({
      id: Math.random().toString(36).substring(2, 15),
      ...d,
    })) as User[];

    this.users.push(...created);
    return created;
  }

  async bulkUpdate(data: { id: string; updates: Partial<User> }[]): Promise<User[]> {
    const updatedUsers: User[] = [];
    for (const { id, updates } of data) {
      const user = await this.findById(id);
      Object.assign(user, updates);
      updatedUsers.push(user);
    }
    return updatedUsers;
  }

  async bulkDelete(ids: string[]): Promise<void> {
    this.users = this.users.filter((user) => !ids.includes(user.id));
  }

  async upsert(data: Partial<User>): Promise<User> {
    const existing = this.users.find((u) => u.id === data.id);
    if (existing) {
      Object.assign(existing, data);
      return existing;
    } else {
      const newUser = {
        id: Math.random().toString(36).substring(2, 15),
        ...data,
      } as User;
      this.users.push(newUser);
      return newUser;
    }
  }
}
