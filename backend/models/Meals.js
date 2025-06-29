const mongoose = require("mongoose");
const {Schema}=mongoose
const mealplannerSchema = new Schema({
  name: { type: String, unique:true, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  prepTimeMinutes: { type: Number, required: true },
  cookTimeMinutes: { type: Number, required: true },
  servings: { type: Number, required: true },
  difficulty: { type: String, required: true },
  cuisine: { type: String, required: true },
  caloriesPerServing: { type: Number },
  tags: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true },
  mealType: { type: String, required: true },
});
module.exports = mongoose.model("Meals", mealplannerSchema);
