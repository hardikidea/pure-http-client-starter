import { DomainError } from './DomainError';

export class UserNotFoundError extends DomainError {
  constructor(userId: string) {
    super(`User ${userId} not found`, 'USER_NOT_FOUND', 404);
  }
}
