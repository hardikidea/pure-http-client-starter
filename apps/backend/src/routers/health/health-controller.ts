import { Response } from 'express';

import { Sequelize } from 'sequelize-typescript';
import { ORM } from '../../config/orm';
import logger from '../../loggers/logger';
import { HttpRequest } from '../../http/request';

export class HealthController {
  constructor(private instance: Sequelize = ORM.getInstance()) {}

  static createNull({ isDatabaseUP }: { isDatabaseUP: boolean }) {
    return new HealthController(
      ORM.createNull({
        isDatabaseUP,
      }),
    );
  }

  async health(_request: HttpRequest, response: Response<unknown, Record<string, unknown>>) {
    try {
      await this.instance.authenticate();
      response.status(200).json({ status: 'UP' });
    } catch (error) {
      logger.error(`Error From health endpoint : ${error}`);
      response.status(500).json({ status: 'DOWN' });
    }
  }
}
