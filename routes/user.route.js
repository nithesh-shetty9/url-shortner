const express=require('express');
const router=express.Router();
const {postusersignup,
    handleuserlogin
}=require("../controllers/user.controller.js");
router.post('/signup',postusersignup)
router.post('/login', handleuserlogin)
module.exports=router;