const express=require('express')
const User=require('../models/User')
const bcrypt=require('bcrypt')
const {body,validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const JWT_KEY='$AdMiN2709@JuTt%'
const router=express.Router()
const fetchuser=require('../middleware/fetchuser.js')
//Route 1: Create User by POST method
router.post('/createUser',[ body("name", "Enter Valid Name").isLength({ min: 3 }),
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Is too Short").isLength({ min: 8 }),],async (req,res)=>{
    const {name,email,password}=req.body
    try{
         const errors = validationResult(req);
              if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
              }
              const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(400).json({error:'User already exist with this email'})
    }
     const salt =await bcrypt.genSalt(10)
    const encryptedPassword=await bcrypt.hash(password,salt)
    const user = await User.create({name:name,email:email,password:encryptedPassword})
    const data={user:{
        id:user.id
    }}
    const token=jwt.sign(data,JWT_KEY)
    res.status(200).json({token})
    }catch(err){
        res.status(500).json({error:'Internal server error',err})
    }    
})
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password cannnot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Wrong Credentials" });
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({ error: "Wrong Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_KEY);
      res.status(200).json({token});
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", err });
    }
  }
);
//Router 3: Get user data using POST method (after user logged in) auth required
router.post("/getUser",fetchuser,async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if(!user){
      return res.status(404).json({error:"User Not Found"})
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});


module.exports = router;
