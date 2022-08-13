const AppError = require("../utils/appError");

//** CastError - handler */
exports.handleCastErrorDB = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
