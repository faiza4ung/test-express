const catchAsync = require("../utils/catchAsync"),
  { sign, verify } = require("jsonwebtoken"),
  AppError = require("../utils/appError"),
  User = require("../models/userModel"),
  { JWT_KEY } = require("../configs"),
  { promisify } = require("util");

const signToken = (id) => {
  return sign({ id }, JWT_KEY, {
    expiresIn: "10m",
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: { user: newUser },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //** 1) check if email & password is exist */
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  //** 2) check if user exist && password is correct */
  const user = await User.findOne({ email }).select("+password");
  const correct = await user.correctPassword(password, user.password);
  // (await user.correctPassword(password, user.password))
  if (!user || !correct) {
    return next(new AppError("Incorect email or password", 401));
  }

  //** 3) if everything OK, send token to client */
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protected = catchAsync(async (req, res, next) => {
  //** 1) Getting token and check of it's there */
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  //** 2) Verification token */
  const decoded = await promisify(verify)(token, JWT_KEY);

  //** 3) Check if user still exists */
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The token belonging to this user does no longer exist", 401)
    );
  }

  //** 4) Check if user changed password after the token was issued */
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changedd password! Please log in again", 401)
    );
  }

  //** GRANT ACCESS TO PROTECTED ROUTE */
  req.user = freshUser;
  next();
});
