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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
  { timestamps: true }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

module.exports = model("Tour", tourSchema);
