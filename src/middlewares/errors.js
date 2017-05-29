const logger = require('../lib/logger');

const errors = (err, req, res, next) => {
  if (err.isBoom) {
    const { payload } = err.output;
    next(res.status(parseInt(payload.statusCode, 10)).json({ error: payload.error }));
  } else {
    logger.error(err);
    next(res.status(500).json({ error: 'Unable to process' }));
  }
};

module.exports = errors;
