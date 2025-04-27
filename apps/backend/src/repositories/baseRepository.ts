export interface BaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;

  bulkCreate(data: Partial<T>[]): Promise<T[]>;
  bulkUpdate(data: { id: string; updates: Partial<T> }[]): Promise<T[]>;
  bulkDelete(ids: string[]): Promise<void>;

  upsert(data: Partial<T>): Promise<T>;
}
