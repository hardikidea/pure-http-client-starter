import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, errors, json, colorize } = format;

const logFormatDev = combine(
  colorize(), // 👈 Add color for development
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] ${level}: ${stack || message}`;
  }),
);

const logFormatProd = combine(timestamp(), errors({ stack: true }), json());

const loggerTransports = [
  new transports.Console(),

  // 🔥 Write error-level logs to error.log
  new transports.File({ filename: 'logs/error.log', level: 'error' }),

  // 🔥 Write all logs to combined.log
  new transports.File({ filename: 'logs/combined.log' }),

  // 🔥 Daily rotated error logs
  new DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true, // compress old logs
    maxSize: '20m', // max size per file
    maxFiles: '14d', // keep for 14 days
    level: 'error',
  }),

  // 🔥 Daily rotated combined logs
  new DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }),
];

export const WinstonLogger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: process.env.NODE_ENV === 'production' ? logFormatProd : logFormatDev,
  transports: [...loggerTransports, new transports.Console()],
  exitOnError: false,
});
