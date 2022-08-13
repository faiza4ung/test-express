const express = require("express"),
  {
    getAllUser,
    createUser,
    updateUser,
    getUser,
    deleteUser,
  } = require("../controllers/userController"),
  { signup, login } = require("../controllers/authController");

const router = express.Router();

//** SIGNUP & LOGIN */
router.post("/signup", signup);
router.post("/login", login);

//** MANAGE USER */
router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
