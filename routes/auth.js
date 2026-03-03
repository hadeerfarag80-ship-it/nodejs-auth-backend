const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const { User, validateRegisterUser, validateLoginUser } = require("../models/User");
const bcrypt = require('bcryptjs');
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
// register new user

router.post("/register" , asynchandler(async(req , res ) => {
const { error } = validateRegisterUser(req.body);
if(error){
    return res.status(400).json({message : error.details[0].message});
}
let user = await User.findOne({email : req.body.email});
if(user){
    return res.status(400).json({message : "email already exists"});
}
 const salt = await bcrypt.genSalt(10);
 req.body.password = await bcrypt.hash(req.body.password , salt);
user = new User({
    email : req.body.email,
    username : req.body.username,
    password : req.body.password,
   
});
const result = await user.save();
const token = user.generateToken();
const { password, ...other} = result._doc;
res.status(201).json({...other, token});
}));

// login user

router.post("/login" , asynchandler(async(req , res ) => {
const { error } = validateLoginUser(req.body);
if(error){
    return res.status(400).json({message : error.details[0].message});
}

let user = await User.findOne({email : req.body.email});
if(!user){
    return res.status(400).json({message : "invalid email or email"});
}
const ispasswordMatch = await bcrypt.compare(req.body.password , user.password);
if(!ispasswordMatch){
    return res.status(400).json({message : "invalid password or password"});
}
const token = user.generateToken();
const { password, ...other} = user._doc;
res.status(201).json({...other, token});
}));


module.exports = router;