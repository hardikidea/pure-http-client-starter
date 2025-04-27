import { createLogger, format, Logger, transports } from 'winston';
import env from '../env';
import { EmittingTransport } from './emitter';
import { asyncLocalStorage } from '../routers/oauth-middleware';

const isLocalEnv = env.NODE_ENV === 'local';
const logFormat = isLocalEnv
  ? format.combine(format.colorize({ all: true }), format.simple())
  : format.combine(
      format.timestamp(),
      format.json(),
      format((context) => {
        const clientId = asyncLocalStorage.getStore()?.get('clientId');
        if (clientId) {
          context.clientId = clientId;
        }
        return context;
      })(),
    );

const logger: Logger = createLogger({
  level: env.LOG_LEVEL,
  format: logFormat,
  transports: [new transports.Console(), new EmittingTransport()],
});

export default logger;
