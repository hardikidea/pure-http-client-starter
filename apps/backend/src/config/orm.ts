import { Sequelize } from 'sequelize-typescript';
import { getDBOptions } from './sequelize';

export class ORM {
  private static sequelize: Sequelize;

  private constructor() {}

  static getInstance(): Sequelize {
    if (!this.sequelize) {
      this.sequelize = new Sequelize(getDBOptions());
    }
    return this.sequelize;
  }

  static createNull({ isDatabaseUP }: { isDatabaseUP: boolean }): Sequelize {
    return {
      authenticate: async () => {
        return isDatabaseUP ? Promise.resolve() : Promise.reject();
      },
    } as Sequelize;
  }
}
