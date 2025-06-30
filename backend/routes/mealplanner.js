const express = require("express");
const Mealplan = require("../models/MealPlanner");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser.js");

// GET meal plan
router.get("/getmeal", fetchuser, async (req, res) => {
  try {
    const mealPlan = await Mealplan.find({ user: req.user.id });
    if (!mealPlan || mealPlan.length === 0) {
      return res.status(404).json({ success: "No meal plan found" });
    }
    return res.status(200).json(mealPlan);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});

// POST add meal plan
router.post("/addmeal", fetchuser, async (req, res) => {
  const { date, day, time, meal } = req.body;
  try {
    const newPlan = await Mealplan.create({
      date,
      day,
      time,
      meal,
      user: req.user.id,
    });
    return res.status(200).json({ success: "Plan added successfully", newPlan });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});

// PUT update meal plan
router.put("/updatemeal/:id", fetchuser, async (req, res) => {
  const { meal } = req.body;
  try {
    const findMeal = await Mealplan.findById(req.params.id);
    if (!findMeal) {
      return res.status(404).json({ error: "No meal plan found" });
    }
    if (findMeal.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Allowed" });
    }
    const updatedPlan = await Mealplan.findByIdAndUpdate(
      req.params.id,
      { meal },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedPlan);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});

// DELETE meal plan
router.delete("/deletemeal/:id", fetchuser, async (req, res) => {
  try {
    const findOneToDelete = await Mealplan.findById(req.params.id);
    if (!findOneToDelete) {
      return res.status(404).json({ error: "Plan not found" });
    }
    if (findOneToDelete.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Allowed" });
    }
    await Mealplan.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: "Meal plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});

module.exports = router;
