const express = require("express"),
  {
    getAllTours,
    createTours,
    getTours,
    updateTours,
    deleteTours,
    topTours,
  } = require("../controllers/tourController");

const router = express.Router();

//** ALIASING */
router.route("/top-5-cheap").get(topTours, getAllTours);

//** ROUTE GENERAL */
router.route("/").get(getAllTours).post(createTours);
router.route("/:id").get(getTours).patch(updateTours).delete(deleteTours);

module.exports = router;
