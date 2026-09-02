const jwt=require('jsonwebtoken');
require("dotenv").config();
function setuser(user){
    const payload=user;
    return jwt.sign(payload,process.env.JWT_SECRET_KEY);
}
function getuser(token){
    if(!token)return null;
    try {
        return jwt.verify(token,process.env.JWT_SECRET_KEY);
    } catch (error) {
        return null;
    }
}
module.exports={
    setuser,
    getuser
}
