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
    return res.json({message:"user created successfully"})
}
const handleuserlogin=async(req,res)=>{
    const {email,password}=req.body;
    const user=await users.findOne({email});
    console.log(user);
    if(!user||user.password!=password)
    {
        return res.json({error:"invalid username or password"})
    }
    const token=setuser({
        _id: user._id.toString(),
        name: user.name,
        email: user.email
    });
    return res.json({token});
}
module.exports={
    postusersignup,
    handleuserlogin
}
