const express = require("express");
const {
  getAllTours,
  createTours,
  getTours,
  updateTours,
  deleteTours,
} = require("../controllers/tourController");

const appR = express.Router();

appR.route("/").get(getAllTours).post(createTours);
appR.route("/:id").get(getTours).patch(updateTours).delete(deleteTours);

module.exports = appR;
