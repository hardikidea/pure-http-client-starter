require('dotenv').config(); // Load .env files

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'pure_dev',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'pure_test',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
  stage: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'pure_stage',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'pure_prod',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
};
