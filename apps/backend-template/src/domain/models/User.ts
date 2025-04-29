import { Column, PrimaryKey, Table } from 'sequelize-typescript';
import { BaseModel } from '../../shared/bases/BaseModel';

@Table({ tableName: 'users' })
export class User extends BaseModel<User> {
  @PrimaryKey
  @Column
  id!: string;

  @Column
  name!: string;
}
