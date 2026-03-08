const asynchandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const {User , validateUpdateUser} = require("../models/User");
const jwt = require("jsonwebtoken");
const {verifyTokenAuthorization,verifyTokenAdmin} = require("../middlewares/verifyToken");
/* get all users
access only for admin 
route : GET /api/users
*/
const getallUsers = asynchandler(async(req,res)=>{
    const users = await User.find().select("-password");
    res.status(200).json(users);
});
/* get user by id
access only for user himself and admin
route : GET /api/users/:id
*/
const getuserById = asynchandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    if(user){
    res.status(200).json(user);
}else{
    res.status(404).json({message : "user not found"});
}
});
/* update users
access only for user himself and admin 
route : PUT /api/users/:id
*/
const updateUser = asynchandler(async(req,res)=>{
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
});
/* delete user by id
access only for user himself and admin
route : DELETE /api/users/:id
*/
const deleteUser =asynchandler(async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id).select("-password");
    if(user){
    res.status(200).json({message : "user deleted successfully"});

}else{
    res.status(404).json({message : "user not found"});
}
});

module.exports = {
    getallUsers,
    getuserById,
    deleteUser,
    updateUser
}