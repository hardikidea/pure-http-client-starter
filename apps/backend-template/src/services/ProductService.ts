import { ProductRepository } from '../domain/repositories/ProductRepository';
import { Product } from '../domain/models/Product';
import { BaseService } from '../shared/bases/BaseService';

export class ProductService extends BaseService<ProductRepository, Product> {
  async listProducts(): Promise<Product[]> {
    return this.repository.findAll();
  }

  static create(): ProductService {
    return new ProductService(ProductRepository.create());
  }

  static createNull(): ProductService {
    return new ProductService(ProductRepository.createNull());
  }
}
