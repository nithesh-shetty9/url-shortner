const users=require("../models/user.model.js")
const urls=require("../models/urlmodel.js")
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
    return res.redirect("/");
}
module.exports={
    postusersignup,
    handleuserlogin
}