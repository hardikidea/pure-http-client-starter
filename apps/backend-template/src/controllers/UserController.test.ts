import { describe, it, expect } from 'vitest';
import { UserController } from '../../src/controllers/UserController';
import { Request, Response } from 'express';

describe('UserController', () => {
  const controller = UserController.createNull();

  it('should respond with empty array', async () => {
    const req = {} as Request;
    const res = {
      json: (output: unknown) => {
        expect(Array.isArray(output)).toBe(true);
        expect((output as Array<unknown>).length).toBe(0);
      }
    } as unknown as Response;

    await controller.getAllUsers(req, res);
  });
});
