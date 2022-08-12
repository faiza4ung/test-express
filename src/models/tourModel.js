const { Schema, model } = require("mongoose");

//** Tours Model */
const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "a Tour must have name"],
      unique: true,
      trim: true,
    },
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
    },
    ratingsAverage: { type: Number, default: 3.5 },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: { type: Number, required: [true, "a Tour must have price"] },
    priceDiscount: Number,
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
    //? install npm package slugify
    //* slug: String,
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
  { timestamps: true }
);

//** virtual property */
tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

//** document middleware - run before .save() and .create() .insertMany() */
tourSchema.pre("save", function () {
  console.log(this); //** Minus middleware slug */
});

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(docs);
  console.log(`Query took ${Date.now() - this.start} ms!`);
  next();
});

module.exports = model("Tour", tourSchema);
