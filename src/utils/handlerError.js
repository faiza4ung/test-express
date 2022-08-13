const AppError = require("../utils/appError");

//** CastError - handler */
exports.handleCastErrorDB = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

//** 1100 - handler */
exports.handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field ${value} please use another value!`;
  return new AppError(message, 400);
};
