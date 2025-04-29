import { BaseModel } from './BaseModel';

export abstract class BaseRepository<T extends BaseModel<T>> {
  protected readonly model: any;

  constructor(model: any) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  async findById(id: string): Promise<T> {
    const found = await this.model.findByPk(id);
    return found ?? this.nullObject();
  }

  async create(data: object): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: object): Promise<T> {
    await this.model.update(data, { where: { id } });
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.model.destroy({ where: { id } });
    return deleted > 0;
  }

  protected nullObject(): T {
    return {} as T;
  }
}
