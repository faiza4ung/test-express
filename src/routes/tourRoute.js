const express = require("express"),
  {
    getAllTours,
    createTours,
    getTours,
    updateTours,
    deleteTours,
    checkId,
  } = require("../controllers/tourController");

const router = express.Router();

router.param("id", checkId);

router.route("/").get(getAllTours).post(createTours);
router.route("/:id").get(getTours).patch(updateTours).delete(deleteTours);

module.exports = router;
