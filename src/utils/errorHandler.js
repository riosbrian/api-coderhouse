import winstonConfig from '../config/loggers/loggers.dev.js';

export default (error, req, res, next) => {
  req.logger = winstonConfig;
  req.logger.FATAL(
    `${req.method} | ${req.url} | ${
      error.message
    } |${new Date().toLocaleTimeString()}`
  );
  return res.status(400).json({
    message: error.message,
    response: false,
  });
};
