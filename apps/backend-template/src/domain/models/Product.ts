import { Column, PrimaryKey, Table } from 'sequelize-typescript';
import { BaseModel } from '../../shared/bases/BaseModel';

@Table({ tableName: 'products' })
export class Product extends BaseModel<Product> {
  @PrimaryKey
  @Column
  id!: string;

  @Column
  name!: string;

  @Column
  price!: number;
}
