const mongoose = require("mongoose");
const Ingredient = require("../models/Ingredient");
const fs = require("fs");
const path = require("path");

// Load JSON file
const filePath = path.join(__dirname, "ingredients.json");
const rawData = fs.readFileSync(filePath, "utf-8");
const ingredients = JSON.parse(rawData);

async function seedDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/home-chef", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    await Ingredient.deleteMany(); // Optional: Clear previous data
    const inserted = await Ingredient.insertMany(ingredients);

    console.log(`✅ ${inserted.length} ingredients inserted`);
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding ingredients:", err);
    process.exit(1);
  }
}

seedDB();
