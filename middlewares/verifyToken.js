const  jwt = require('jsonwebtoken');
//verify token
function verifyToken(req, res, next) {
    const token = req.headers.token;
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();

        }
        catch(error){
            return res.status(401).json({message:"invalid token"});
        }
    }
    else{
        return res.status(401).json({message:"no token provided"});
    }
}
// verify token and Authrization
function verifyTokenAuthorization(req,res,next)
{
    verifyToken(req,res , ()=> {
        if(req.user.id === req.params.id || req.user.isAdmain){
            next();
        }
        else{
            return res.status(403).json({message : "you are not allowed"});
        }
    });
}
// verify token and Admin
function verifyTokenAdmin(req,res,next)
{
    verifyToken(req,res , ()=> {
        if(req.user.isAdmain){
            next();
        }
        else{
            return res.status(403).json({message : "you are not allowed,only admin allowed"});
        }
    });
}
module.exports = {
    verifyToken,
    verifyTokenAuthorization,
    verifyTokenAdmin
};