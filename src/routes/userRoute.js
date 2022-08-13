const express = require("express"),
  {
    getAllUser,
    createUser,
    updateUser,
    getUser,
    deleteUser,
  } = require("../controllers/userController"),
  { signup } = require("../controllers/authController");

const router = express.Router();

//** LOGIN */
router.post("/signup", signup);

//** MANAGE USER */
router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
