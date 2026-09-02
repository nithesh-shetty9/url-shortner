const {v4:uuidv4}=require('uuid');
const users=require("../models/user.model.js")
const urls=require("../models/urlmodel.js")
const {setuser}=require("../services/auth.js");
const postusersignup=async(req,res)=>{
    const {name,email,password}=req.body;
    await users.create({
        name,
        email,
        password
    })
    return res.redirect("/")
}
const handleuserlogin=async(req,res)=>{
    const {email,password}=req.body;
    const user=await users.findOne({email});
    if(!user||user.password!=password)
    {
        return res.render("Login",{
            error:"invalid username or password"
        })
    }
    const sessionid=uuidv4();
    setuser(sessionid,user);
    res.cookie('uid',sessionid);
    return res.redirect("/");
}
module.exports={
    postusersignup,
    handleuserlogin
}