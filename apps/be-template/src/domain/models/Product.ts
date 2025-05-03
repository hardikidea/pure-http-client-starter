import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';


@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.STRING })
  name!: string;

  @Column({ type: DataType.INTEGER })
  price!: number;
}
