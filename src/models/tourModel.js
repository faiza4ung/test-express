const { Schema, model } = require("mongoose");
const slugify = require("slugify");
// validator = require("validator");

//** Tours Model */
const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "a Tour must have name"],
      unique: true,
      trim: true,
      maxLength: [40, "a Tour must have less or equals then 40 character"],
      minLength: [10, "a Tour must have more or equals then 10 character"],
      // validate: [validator.isAlpha, "Tour name must only contain characters"],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "a Tour must have durations"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "a Tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "a Tour must have a group size"],
      enum: {
        values: ["easy", "medium", "hard"],
        message: "Difficulty is either: easy, medium, hard",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 3.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: { type: Number, required: [true, "a Tour must have price"] },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          //** this only points to current doc on NEW document creation */
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "a Tour must have description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "a Tour must have cover image"],
    },
    images: [String],
    startDates: [Date],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    //? install npm package slugify
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//** virtual property */
tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

//** document middleware - run before .save() and .create() .insertMany() */
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//** QUERY MIDDLEWARE  - Cek kecepatan query
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} ms!`);
  next();
});

//** AGGREGATION MIDDLEWARE */
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
  console.log(this.pipeline());
  next();
});

module.exports = model("Tour", tourSchema);
