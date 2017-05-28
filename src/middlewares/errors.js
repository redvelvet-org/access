const logger = require('../lib/logger');

const errors = (err, req, res, next) => {
  if (err.isBoom) {
    const { payload } = err.output;
    res.boom.create(parseInt(payload.statusCode, 10), payload.error);
    next();
  } else {
    logger.error(err);
    next(res.boom.create(500, 'Unable to process'));
  }
};

module.exports = errors;
