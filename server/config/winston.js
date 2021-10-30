const appRoot = require('app-root-path');
const winston = require('winston');

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    // silent: process.env.NODE_ENV === 'test',
  },
};

const logger = winston.createLogger({
  prettyPrint: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      (info) => `${info.timestamp} - ${info.level}: ${info.message}`,
    ),
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
});

logger.stream = {
  write(message, encoding) {
    logger.info(message, encoding);
  },
};

module.exports = logger;
