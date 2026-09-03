const {getuser}=require("../services/auth");

const validateuser = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token){
    return res.redirect("/login")
  }
  const tokenid=token.split(" ")[1];
  const user=getuser(tokenid);
  if(!user)
  {
    return res.redirect("/login")
  }
  req.user=user;
  next();
};
const checkauth=(req,res,next)=>{
   const token = req.headers.authorization;
   if(!token)return next();
  const tokenid=token.split(" ")[1];
   const user=getuser(tokenid);
   if(!user)return next();
  req.user=user;
  next();
}
module.exports={
  validateuser,
  checkauth
};
