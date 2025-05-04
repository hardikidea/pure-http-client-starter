import { describe, it, expect } from 'vitest';
import { ProductController } from '../../src/controllers/ProductController';
import { Request, Response } from 'express';

describe('ProductController', () => {
  const controller = ProductController.createNull();

  it('should respond with empty array', async () => {
    const req = {} as Request;
    const res = {
      json: (output: unknown) => {
        expect(Array.isArray(output)).toBe(true);
        expect((output as Array<unknown>).length).toBe(0);
      },
    } as unknown as Response;

    await controller.getAllProducts(req, res);
  });
});
