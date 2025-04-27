import dotenv from 'dotenv';
import z from 'zod';

/* eslint sort-keys: "error"*/
const envSchema = z.object({
  CLIENT_ORIGIN: z.string().url().default('http://localhost:3000'),
  DB_HOST: z.string().default('localhost'),
  DB_NAME: z.string().default('sharelinks'),
  DB_PASSWORD: z.string().default('postgres'),
  DB_PORT: z.string().default('5432'),
  DB_USERNAME: z.string().default('postgres'),
  LOG_LEVEL: z.string().default('info'),
  NODE_ENV: z.string().default('development'),
  PORT: z.string().default('3000'),
});

dotenv.config({ path: `${__dirname}/../secrets.env` });
// Ignore lint rule here because we need it to parse the environment variables
// eslint-disable-next-line no-process-env
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('❌ Invalid environment variables:', JSON.stringify(env.error.format(), null, 4));
  process.exit(1);
}

export default env.data;
