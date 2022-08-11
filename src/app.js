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
app.use((req, res, next) => {
  console.log("Punten dari middleware 👋");
  next();
});

//** ROUTES **/
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);

module.exports = app;
