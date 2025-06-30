const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient.js');
const fetchuser = require('../middleware/fetchuser.js'); 

// Route: fetch all ingridents using Get method
router.get('/fetchingredients', fetchuser, async (req, res) => {
  try {
    const user = req.user; 

    const data = await Ingredient.find(); 
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', err });
  }
});

module.exports = router;
