import { describe, it, expect, beforeEach } from 'vitest';
import { UserService } from './userService';
import { User } from '../models/user';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = UserService.createNull(); // Use Stubbed Repository
  });

  it('creates a user', async () => {
    const user = await userService.createUser({ name: 'Test', email: 'test@example.com' });
    expect(user.name).toBe('Test');
    expect(user.email).toBe('test@example.com');
  });

  it('lists users', async () => {
    await userService.createUser({ name: 'Test1', email: 'test1@example.com' });
    const users = await userService.listUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  it('finds a user by id', async () => {
    const created = await userService.createUser({ name: 'FindMe', email: 'findme@example.com' });
    const found = await userService.findUser(created.id);
    expect(found.id).toBe(created.id);
  });

  it('updates a user', async () => {
    const created = await userService.createUser({
      name: 'UpdateMe',
      email: 'updateme@example.com',
    });
    const updated = await userService.updateUser(created.id, { name: 'UpdatedName' });
    expect(updated.name).toBe('UpdatedName');
  });

  it('deletes a user', async () => {
    const created = await userService.createUser({
      name: 'DeleteMe',
      email: 'deleteme@example.com',
    });
    await userService.deleteUser(created.id);
    await expect(userService.findUser(created.id)).rejects.toThrow();
  });

  it('bulk creates users', async () => {
    const users = await userService.bulkCreateUsers([
      { name: 'Bulk1', email: 'bulk1@example.com' } as unknown as User,
      { name: 'Bulk2', email: 'bulk2@example.com' } as unknown as User,
    ]);
    expect(users.length).toBe(2);
  });

  it('bulk updates users', async () => {
    const users = await userService.bulkCreateUsers([
      { name: 'BulkUpdate1', email: 'bulkupdate1@example.com' } as unknown as User,
      { name: 'BulkUpdate2', email: 'bulkupdate2@example.com' } as unknown as User,
    ]);

    const updates = users.map((u) => ({
      id: u.id,
      updates: { name: u.name + '_Updated' },
    }));

    const updated = await userService.bulkUpdateUsers(updates);
    expect(updated[0].name).toContain('_Updated');
    expect(updated[1].name).toContain('_Updated');
  });

  it('bulk deletes users', async () => {
    const users = await userService.bulkCreateUsers([
      { name: 'BulkDelete1', email: 'bulkdelete1@example.com' } as unknown as User,
      { name: 'BulkDelete2', email: 'bulkdelete2@example.com' } as unknown as User,
    ]);

    const ids = users.map((u) => u.id);
    await userService.bulkDeleteUsers(ids);

    const all = await userService.listUsers();
    expect(all.length).toBe(0);
  });

  it('upserts a new user', async () => {
    const user = await userService.upsertUser({
      name: 'UpsertMe',
      email: 'upsertme@example.com',
    } as unknown as User);
    expect(user.name).toBe('UpsertMe');
  });

  it('upserts an existing user', async () => {
    const created = await userService.createUser({
      name: 'UpsertExist',
      email: 'upsertexist@example.com',
    });
    const updated = await userService.upsertUser({
      id: created.id,
      name: 'Upserted',
      email: created.email,
    } as unknown as User);
    expect(updated.name).toBe('Upserted');
  });
});
