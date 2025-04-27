import { BaseException } from './baseException';

export class UserNotFoundException extends BaseException {
  constructor(userId: string) {
    super(`User with id ${userId} not found`, 404);
  }
}
