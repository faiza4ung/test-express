const express = require("express"),
  morgan = require("morgan");

const app = express();
//** 1 MIDDLEWARE **/
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  console.log("Punten dari middleware 👋");
  next();
});

//** 2 ROUTES **/
const tourRoute = require("./src/routes/tourRoute"),
  userRoute = require("./src/routes/userRoute");
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);

module.exports = app;
