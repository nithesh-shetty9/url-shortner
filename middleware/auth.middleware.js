const {getuser}=require("../services/auth");

const validateuser = (req, res, next) => {
  const userid = req.cookies?.uid;
  if(!userid)return res.redirect("/login");
  const user=getuser(userid);
  if(!user)
  {
    return res.redirect("/login")
  }
  req.user=user;
  next();
};
const checkauth=(req,res,next)=>{
   const userid = req.cookies?.uid;
  const user=getuser(userid);
  req.user=user;
  next();
}
module.exports={
  validateuser,
  checkauth
};
