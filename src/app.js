const express = require("express"),
  AppError = require("./utils/appError"),
  globalErrorHandler = require("./controllers/errorController");
(morgan = require("morgan")), (dotenv = require("dotenv"));

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
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//** ERROR HANDLING */
app.use(globalErrorHandler);

module.exports = app;
