const { sendError } = require('../utils/apiResponse');

const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  return sendError(
    res,
    err.message || 'Internal server error',
    statusCode
  );
};

module.exports = {
  notFound,
  errorHandler
};
