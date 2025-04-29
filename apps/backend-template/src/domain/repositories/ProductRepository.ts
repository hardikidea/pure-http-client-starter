import { Product } from '../models/Product';
import { BaseRepository } from '../../shared/bases/BaseRepository';

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product);
  }

  protected nullObject(): Product {
    return Product.build({ id: 'null', name: '', price: 0 });
  }

  static create(): ProductRepository {
    return new ProductRepository();
  }

  static createNull(): ProductRepository {
    return new ProductRepository();
  }
}
