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

//** ValidationError */
exports.handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

//** JsonWebTokenError */
exports.handleJWTError = () =>
  new AppError("Invalid token, Please log in again", 401);

//** TokenExpiredError */
exports.handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again", 401);
