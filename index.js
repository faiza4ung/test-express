const express = require("express");
const morgan = require("morgan");

const tourRoute = require("./src/routes/tourRoute");

const app = express();
//** 1 MIDDLEWARE **/
app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  console.log("Punten dari middleware 👋");
  next();
});

//** 2 ROUTES **/
app.use("/api/v1/tours", tourRoute);

//** 3 START SERVER **/
const port = 3000;
app.listen(port, () => {
  console.log(`App running on http://localhost/${port}...`);
});
