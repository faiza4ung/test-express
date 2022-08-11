const express = require("express");
const {
  getAllTours,
  createTours,
  getTours,
  updateTours,
  deleteTours,
} = require("../controllers/tourController");

const router = express.Router();

router.route("/").get(getAllTours).post(createTours);
router.route("/:id").get(getTours).patch(updateTours).delete(deleteTours);

module.exports = router;
