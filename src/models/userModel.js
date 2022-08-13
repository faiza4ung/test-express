const { Schema, model } = require("mongoose"),
  { hash, compare } = require("bcryptjs"),
  { default: isEmail } = require("validator/lib/isEmail");

//** name, email, photo, password, passwordConfirm */
const userSchema = new Schema({
  name: { type: String, required: [true, "Please tell us your name"] },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please provide a valid email"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [8, "Minimal 8"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE & SAVE
      validator: function (el) {
        return el === this.password; // abc === abc
      },
      message: "Password ar not the same",
    },
  },
  passwordChangedAt: Date,
});

//** hashing password before save */
userSchema.pre("save", async function (next) {
  //** Only run this function if password was actually modified */
  if (!this.isModified("password")) return next();

  //** hash password */
  this.password = await hash(this.password, 8);

  //** delete passwordConfirm field */
  this.passwordConfirm = undefined;
  next();
});

//** Login Method */
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await compare(candidatePassword, userPassword);
};

//** Expired token when changed password */
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp; // 100 < 200 = false
  }

  // False means NOT changed
  return false;
};

module.exports = model("User", userSchema);
