const express=require("express");
const router=express.Router();
const {postdata,getdata}=require("../controllers/urlcontrollers");
router.post("/",postdata);
router.get("/analytics/:shortid",getdata);
module.exports=router;