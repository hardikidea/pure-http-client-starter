import { createLogger, format, Logger, transports } from 'winston';
import env from '../env';
import { EmittingTransport } from './emitter';

const isLocalEnv = env.NODE_ENV === 'development';
const logFormat = isLocalEnv
  ? format.combine(format.colorize({ all: true }), format.simple())
  : format.combine(format.timestamp(), format.json());

const logger: Logger = createLogger({
  level: env.LOG_LEVEL,
  format: logFormat,
  transports: [new transports.Console(), new EmittingTransport()],
});

export default logger;
