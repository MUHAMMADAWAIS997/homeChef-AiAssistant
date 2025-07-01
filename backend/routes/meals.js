const express = require('express');
const router = express.Router();
const Meal = require('../models/Meals');
const fetchuser = require('../middleware/fetchuser.js'); 

// Route: get all meals using Get method
router.get('/fetchmeals', fetchuser, async (req, res) => {
  try {
    const user = req.user; 

    const meal = await Meal.find(); 
    if (!meal || meal.length === 0) {
      return res.status(404).json({ error: 'No meal found' });
    }

    res.status(200).json({recipes : meal});
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', err });
  }
});

module.exports = router;
