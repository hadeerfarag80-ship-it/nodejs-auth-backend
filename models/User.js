const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require("jsonwebtoken");
// user schema
const userSchema = new mongoose.Schema({
  email : {
    type : String,
    required : true,
    unique : true,
    trim : true ,
    minlength : 5,
    maxlength : 100
  },
    username : {
    type : String,
    required : true,
    trim : true ,
    minlength : 2,
    maxlength : 200
  },
     password : {
    type : String,
    required : true,
    trim : true ,
    minlength : 5,
  },
  isAdmain :{
    type : Boolean,
    default : false
  },

} , {timestamps : true});
//Generate token
userSchema.methods.generateToken = function(){
     return jwt.sign({id: this._id , isAdmain: this.isAdmain}, process.env.JWT_SECRET_KEY, {expiresIn : "4d"});
   
};
// user model
const User = mongoose.model("user",userSchema);
// validate Register user
function validateRegisterUser(obj){
    const schema = Joi.object({
        email : Joi.string().email().required().min(5).max(100).trim(),
        username : Joi.string().trim().min(2).max(200).required(),
        password : Joi.string().trim().min(5).required(),
       
    });
    return schema.validate(obj);
}
// validate login user
function validateLoginUser(obj){
    const schema = Joi.object({
        email : Joi.string().email().required().min(5).max(100).trim(),
        password : Joi.string().trim().min(5).required(),
    });
    return schema.validate(obj);
}
// validate Update user
function validateUpdateUser(obj){
    const schema = Joi.object({
        email : Joi.string().email().min(5).max(100).trim(),
        username : Joi.string().trim().min(2).max(200),
        password : Joi.string().trim().min(5),
       
    });
    return schema.validate(obj);
}
module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
};