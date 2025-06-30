const mongoose = require("mongoose");
const {Schema}=mongoose
const mealsSchema = new Schema({
 name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  prepTimeMinutes: {
    type: Number,
    required: true,
  },
  cookTimeMinutes: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  caloriesPerServing: {
    type: Number,
  },
  tags: {
    type: [String],
    default: [],
  },
  userId: {
    type: Number, 
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  mealType: {
    type: [String],
    default: [],
  }
}, { timestamps: true 
});
module.exports = mongoose.model("Meals", mealsSchema);
