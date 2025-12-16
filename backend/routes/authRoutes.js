const express = require("express");
const router = express.Router()
const User = require("../models/User");

router.post("/signup",async (req,res)=>{
    const { name, email, about, location, password} = req.body;

    if(!name || !email || !about || !location || password){
        return res.status(400).json({message: "All fields required"});
    }

    try{
        const user = new User({name, email, about, location, password});
        await user.save();
        res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ message: "Email already exists" });
  }
});

module.exports = router;