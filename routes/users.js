const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const {User , validateUpdateUser} = require("../models/User");
const jwt = require("jsonwebtoken");
const {verifyTokenAuthorization,verifyTokenAdmin} = require("../middlewares/verifyToken");
/* update users
access only for user himself and admin 
route : PUT /api/users/:id
*/
router.put("/:id" , verifyTokenAuthorization, asynchandler(async(req,res)=>{
    const { error } = validateUpdateUser(req.body);
    if(error){
        return res.status(400).json({message : error.details[0].message});
    }
    
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password , salt);
    }
    const updateUser =  await User.findByIdAndUpdate(req.params.id ,{
        $set:{
            email : req.body.email,
            username : req.body.username,
            password : req.body.password,
        }
    }, {new : true}).select("-password");
    res.status(200).json(updateUser);
}));
/* get all users
access only for admin 
route : GET /api/users
*/
router.get("/" , verifyTokenAdmin, asynchandler(async(req,res)=>{
    const users = await User.find().select("-password");
    res.status(200).json(users);
}));
/* get user by id
access only for user himself and admin
route : GET /api/users/:id
*/
router.get("/:id" , verifyTokenAuthorization, asynchandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    if(user){
    res.status(200).json(user);
}else{
    res.status(404).json({message : "user not found"});
}
}));
/* delete user by id
access only for user himself and admin
route : DELETE /api/users/:id
*/
router.delete("/:id" , verifyTokenAuthorization, asynchandler(async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id).select("-password");
    if(user){
    res.status(200).json({message : "user deleted successfully"});

}else{
    res.status(404).json({message : "user not found"});
}
}));
module.exports = router;