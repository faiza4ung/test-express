const express = require("express"),
  {
    getAllUser,
    createUser,
    updateUser,
    getUser,
    deleteUser,
  } = require("../controllers/userController");

const router = express.Router();
router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
