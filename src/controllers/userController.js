const User = require("../models/userModel"),
  catchAsync = require("../utils/catchAsync");

exports.getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.find();

  //** SEND RESPONSE */
  res.status(200).json({
    status: "success",
    result: user.length,
    message: "Data Found",
    data: {
      user,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "failed",
    message: "This route is not yet defined",
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "failed",
    message: "This route is not yet defined",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "failed",
    message: "This route is not yet defined",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "failed",
    message: "This route is not yet defined",
  });
};
