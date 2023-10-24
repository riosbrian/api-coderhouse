import winstonConfig from '../config/loggers/loggers.dev.js';

export default (req, res, next) => {
  req.logger = winstonConfig;
  req.logger.HTTP(
    `${req.method} | ${req.url} | ${new Date().toLocaleTimeString()}`
  );
  next();
};
