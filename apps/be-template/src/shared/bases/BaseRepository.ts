import { BaseModel } from './BaseModel';
import { ModelStatic } from 'sequelize';

export abstract class BaseRepository<T extends BaseModel<T>> {
  protected readonly model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  async findById(id: string | number): Promise<T> {
    const found = await this.model.findByPk(id);
    return found ?? this.nullObject();
  }

  async create(data: object): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string | number, data: object): Promise<T> {
    await this.model.update(data, { where: { id } });
    return this.findById(id);
  }

  async delete(id: string | number): Promise<boolean> {
    const deleted = await this.model.destroy({ where: { id } });
    return deleted > 0;
  }

  protected abstract nullObject(): T;
}
