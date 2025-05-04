import { BaseRepository } from './BaseRepository';
import { BaseModel } from './BaseModel';

export abstract class BaseService<
  TRepo extends BaseRepository<TModel>,
  TModel extends BaseModel<TModel>,
> {
  protected readonly repository: TRepo;

  constructor(repository: TRepo) {
    this.repository = repository;
  }
}
