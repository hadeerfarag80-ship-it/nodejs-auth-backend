const mongoose =require("mongoose");
const Joi = require("joi");
const authorSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minlength:3,
        maxlength:200,
        trim:true,
    },
    lastName:{
        type:String,
        required: true,
        minlength:3,
        maxlength:200,
        trim:true,     
    },
    nationality:{
        type:String,
        required: true,
        minlength:2,
        maxlength:100,
        trim:true,
    },
    Image:{

    type:String,
        default:"default-avater.png",
    },
},
{timestamps:true}

);
const Author = mongoose.model("Author",authorSchema);

////////// validation post
function validateCreatauthours(obj){
 const schema = Joi.object({
   firstName: Joi.string().trim().min(3).max(200).required(),
   lastName: Joi.string().trim().min(3).max(200).required(),
   nationality: Joi.string().trim().min(2).max(100).required(),
   Image: Joi.string().optional()
 });
 return schema.validate(obj);
}

////validation put
 function validateUpdateBooks(obj){
 const schema = Joi.object({

    firstName:Joi.string().trim().min(3).max(200),
    lastName:Joi.string().trim().min(3).max(200),
     nationality: Joi.string().trim().min(2).max(100).required(),
    Image: Joi.string().optional()

 });
 return schema.validate(obj);
 }
module.exports = {
  Author,
  validateCreatauthours,
  validateUpdateBooks
};