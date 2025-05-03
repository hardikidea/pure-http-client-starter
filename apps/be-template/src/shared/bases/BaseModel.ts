import { Model } from 'sequelize-typescript';

export abstract class BaseModel<T extends {}> extends Model<T> {
  toJSON(): object {
    return super.toJSON();
  }
}
