import { Product } from '../models/Product';
import { BaseRepository } from '../../shared/bases/BaseRepository';
import { CreationAttributes } from 'sequelize';

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product);
  }

  protected nullObject(): Product {
    return Product.build({ id: -1, name: '', price: 0 } as CreationAttributes<Product>);
  }

  static create(): ProductRepository {
    return new ProductRepository();
  }

  static createNull(): ProductRepository {
    return new ProductRepository();
  }
}
