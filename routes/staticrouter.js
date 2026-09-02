const express = require("express");
const router = express.Router();
const Url = require("../models/urlmodel.js");
router.get("/", async (req, res) => {
  if(!req.user)return res.redirect('/login');
  const urls = await Url.find({createdBy:req.user._id});
  res.render("home", {
    urls,
    shorturl: null,
  });
});
router.get("/signup",(req,res)=>{
  return res.render("signup");
})
router.get("/login",(req,res)=>{
  return res.render("Login",{
    error: null
  });
})
module.exports = router;
