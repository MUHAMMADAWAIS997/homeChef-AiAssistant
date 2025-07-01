const express = require("express");
const router = express.Router();
const WishList = require("../models/Favorites");
const fetchuser = require("../middleware/fetchuser");

// get wishlist using GET method:
router.get("/fetchwishlist", fetchuser, async (req, res) => {
  try {
    const wishlist = await WishList.find({ user: req.user.id });
    if (wishlist.length===0) {
      return res.status(200).json({ message: "WishList is empty" });
    }
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});

// add in wish list using Post method:
router.post("/addfavorite", fetchuser, async (req, res) => {
  const { name,meal } = req.body;
  try {
    const existing = await WishList.findOne({ name,user:req.user.id });
    if (existing) {
      return res.status(400).json({ error: "Already added in wishlist" });
    }
    const added = await WishList.create({
      user: req.user.id,
      name,
      meal
    });
    res.status(200).json(added);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});



// delete from shop list using delete method :
 router.delete('/deletefavorite/:id',fetchuser,async(req,res)=>{
    try{
        const deleted = await WishList.findByIdAndDelete({ _id: req.params.id, user: req.user.id })
        if(!deleted){
            return res.status(404).json({error:"Item not found"})
        }
        return res.status(200).json({success:"Item deleted successfully"})
    } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
 })
 module.exports=router