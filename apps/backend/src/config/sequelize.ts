import { SequelizeOptions } from 'sequelize-typescript';
import path from 'path';
import env from '../env';

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } = env;

export function getDBOptions(): SequelizeOptions {
  const modelsPath = path.join(__dirname, '..', 'models');

  return {
    dialect: 'postgres',
    host: DB_HOST,
    port: +DB_PORT,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    logging: false,
    logQueryParameters: true,
    pool: { max: 50, min: 10, acquire: 80000, idle: 50000 },
    models: [modelsPath],
  };
}
