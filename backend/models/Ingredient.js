const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "commonly used ingredients",
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Ingredient", IngredientSchema);
