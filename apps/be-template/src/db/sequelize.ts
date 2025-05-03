import { Sequelize } from 'sequelize-typescript';
import { User } from '../domain/models/User';
import { Product } from '../domain/models/Product';

export class Database {
  static create(): Sequelize {
    return new Sequelize(process.env.DB_URL ?? '', {
      models: [User, Product],
      logging: false,
    });
  }

  static createNull(): Sequelize {
    return new Sequelize('sqlite::memory:', {
      models: [User, Product],
      logging: false,
    });
  }
}
