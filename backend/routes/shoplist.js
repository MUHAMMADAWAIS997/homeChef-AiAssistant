const express = require("express");
const router = express.Router();
const Shoplist = require("../models/ShopList");
const fetchuser = require("../middleware/fetchuser");

// get shoplist using GET method:
router.get("/fetchshoplist", fetchuser, async (req, res) => {
  try {
    const shoplist = await Shoplist.find({ user: req.user.id });
    if (shoplist.length===0) {
      return res.status(404).json({ message: "Shop List is empty" });
    }
    res.status(200).json(shoplist);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});

// add in shop list using Post method:
router.post("/additem", fetchuser, async (req, res) => {
  const {image, title, category, quantity, ingredient } = req.body;
  try {
    const existing = await Shoplist.findOne({ title, user: req.user.id });
    if (existing) {
      return res.status(400).json({ error: "Already added in shoplist" });
    }
    const added = await Shoplist.create({
      user: req.user.id,
      image,
      title,
      category,
      quantity,
      ingredient,
    });
    res.status(200).json(added);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});

// update list using PUT method

router.put("/updateitem/:id", fetchuser, async (req, res) => {
  const { quantity } = req.body;
  try {
    const updated = await Shoplist.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true, runValidators: true }
    );
    if (!updated ) {
      return res.status(400).json({ error: "Item not found" });
    }
    return res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});

// delete from shop list using delete method :
 router.delete('/deleteitem/:id',fetchuser,async(req,res)=>{
    try{
        const deleted = await Shoplist.findByIdAndDelete(req.params.id)
        if(!deleted){
            return res.status(404).json({ error: "Item not found" })
        }
        return res.status(200).json({success:"Item deleted successfully"})
    } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
 })
 module.exports=router