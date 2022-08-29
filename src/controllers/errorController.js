const {
  handleDuplicateFieldsDB,
  handleValidationErrorDB,
  handleJWTExpiredError,
  handleCastErrorDB,
  handleJWTError,
} = require("../utils/handlerError");

//** SEND RESPONSE ERROR ON DEV */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//** SEND RESPONSE ERROR ON PROD */
const sendErrorProd = (err, res) => {
  //** Operational, trusted error: send message to client */
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //** Programming or other unknown error: don't leak error details */
  } else {
    //** 1) Log error */
    console.error("ERROR 🤯", err);

    //** 2) Send generic message*/
    res.status(500).json({
      status: "error",
      message: "Something wrong 👀🙅",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "CastError") err = handleCastErrorDB(err);
  if (err.code === 11000) err = handleDuplicateFieldsDB(err);
  if (err.name === "ValidationError") err = handleValidationErrorDB(err);
  if (err.name === "JsonWebTokenError") err = handleJWTError();
  if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

  if (process.env.NODE_ENV === "development") {
    console.log(err.name);
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // let error = { ...err };

    sendErrorProd(err, res);
  }
};
