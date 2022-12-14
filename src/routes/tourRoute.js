const express = require("express"),
  {
    getAllTours,
    createTours,
    getTours,
    updateTours,
    deleteTours,
    topTours,
    getTourStats,
    getMonthlyPlan,
  } = require("../controllers/tourController"),
  { protected, restrictedTo } = require("../controllers/authController");

const router = express.Router();

//** ALIASING */
router.route("/top-5-cheap").get(topTours, getAllTours);

//** STATS */
router.route("/tour-stats").get(getTourStats);

//** MONTHLY PLAN */
router.route("/monthly-plan/:year").get(getMonthlyPlan);

//** ROUTE GENERAL */
router
  .route("/")
  .get(
    // protected,
    getAllTours
  )
  .post(createTours);
router.route("/:id").get(getTours).patch(updateTours).delete(
  // protected, restrictedTo("admin", "lead-guide"),
  deleteTours
);

module.exports = router;
