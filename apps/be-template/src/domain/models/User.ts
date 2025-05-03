import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.STRING })
  name!: string;

  @Unique
  @Column({ type: DataType.STRING })
  email!: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt!: Date;
}
