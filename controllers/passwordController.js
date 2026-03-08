const asynchandler = require("express-async-handler");
const{User} = require("../models/User");


/* Get forgot password view
route => /password/forgot-password
method=> get
access=> public
*/
module.exports.getforgotPasswordView = asynchandler((req,res)=>{
res.render("forgot-password");
});
/*send forgot password link
route => /password/forgot-password
method=> post
access=> public
*/
module.exports.sendforgotPasswordlink = asynchandler(async(req,res)=>{
console.log(req.body.email);
});