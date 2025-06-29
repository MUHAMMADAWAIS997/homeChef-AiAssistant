const mongoose = require("mongoose");
const {Schema}=mongoose
const mealplannerSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    required: true,
    unique:true
  },
  day:{
    type: String, 
    required:true
  },
  time: {
    type: String,
    required: true,
  },
  meal: {
    type: String,
    required:true,
  },
});
module.exports = mongoose.model("Mealplan", mealplannerSchema);
