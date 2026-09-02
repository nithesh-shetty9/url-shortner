const {getuser}=require("../services/auth");

const validateuser = (req, res, next) => {
  const token = req.cookies?.uid;
  if(!token)return res.redirect("/login");
  const user=getuser(token);
  if(!user)
  {
    return res.redirect("/login")
  }
  req.user=user;
  next();
};
const checkauth=(req,res,next)=>{
   const token = req.cookies?.uid?req.cookies?.uid:null;
   if(!token)return next();
   const user=getuser(token);
   if(!user)return next();
  req.user=user;
  next();
}
module.exports={
  validateuser,
  checkauth
};
