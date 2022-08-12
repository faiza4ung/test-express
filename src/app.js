const express = require("express"),
  morgan = require("morgan"),
  dotenv = require("dotenv");

const tourRoute = require("./routes/tourRoute"),
  userRoute = require("./routes/userRoute");

//** ENVIRONMENT VARIABLE**/
dotenv.config({ path: "./config.env" });

//** START EXPRESS **/
const app = express();

//** MIDDLEWARE **/
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//** ROUTES **/
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);

//** MIDDLEWARE ROUTE UNREGISTERED */
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = "failed";
  err.statusCode = 404;
  next(err);
});

//** ERROR HANDLING */
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
