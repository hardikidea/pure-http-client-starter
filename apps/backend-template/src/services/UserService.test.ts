import { describe, it, expect } from 'vitest';
import { UserService } from '../../src/services/UserService';

describe('UserService', () => {
  const service = UserService.createNull();

  it('should return an array (empty safe)', async () => {
    const users = await service.listUsers();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBe(0);
  });
});
