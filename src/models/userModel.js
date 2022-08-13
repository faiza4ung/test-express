const { Schema, model } = require("mongoose"),
  { hash } = require("bcryptjs"),
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
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [8, "Minimal 8"],
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

module.exports = model("User", userSchema);
