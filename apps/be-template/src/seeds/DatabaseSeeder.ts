import { Sequelize } from 'sequelize-typescript';
import { User } from '../domain/models/User';
import { Product } from '../domain/models/Product';
import { Database } from '../db/sequelize';

export class DatabaseSeeder {
  private readonly sequelize: Sequelize;

  constructor() {
    this.sequelize = Database.create();
  }

  async seed(): Promise<void> {
    await this.sequelize.sync({ force: true }); // reset DB

    await this.seedUsers();
    await this.seedProducts();

    console.log('✅ Seeding completed.');
    process.exit(0);
  }

  private async seedUsers(): Promise<void> {
    const users = [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
      { id: '3', name: 'Charlie' },
    ];
    await User.bulkCreate(users);
    console.log('✅ Users seeded.');
  }

  private async seedProducts(): Promise<void> {
    const products = [
      { id: '1', name: 'Product A', price: 100 },
      { id: '2', name: 'Product B', price: 200 },
      { id: '3', name: 'Product C', price: 300 },
    ];
    await Product.bulkCreate(products);
    console.log('✅ Products seeded.');
  }
}

// Allow direct run
if (require.main === module) {
  new DatabaseSeeder().seed();
}
