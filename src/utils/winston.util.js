const winston = require('winston');

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

module.exports = winstonLogger;
