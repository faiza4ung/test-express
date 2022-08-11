const { Schema, model } = require("mongoose");

//** Tours Model */
const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, "a Tour must have name"],
    unique: true,
  },
  rating: { type: Number, default: 0 },
  price: { type: Number, required: [true, "a Tour must have price"] },
});

module.exports = model("Tour", tourSchema);
