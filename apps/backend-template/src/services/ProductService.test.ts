import { describe, it, expect } from 'vitest';
import { ProductService } from '../../src/services/ProductService';

describe('ProductService', () => {
  const service = ProductService.createNull();

  it('should return an array (empty safe)', async () => {
    const products = await service.listProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBe(0);
  });
});
