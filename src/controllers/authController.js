const User = require("../models/userModel"),
  catchAsync = require("../utils/catchAsync"),
  { JWT_KEY } = require("../configs"),
  { sign } = require("jsonwebtoken");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = sign({ id: newUser._id }, JWT_KEY, {
    // expiresIn: JWT_EXPIRE,
    expiresIn: '25m',
  });

  res.status(201).json({
    status: "success",
    token,
    data: { user: newUser },
  });
});

exports.login = catchAsync();
