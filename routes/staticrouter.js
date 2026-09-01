const express=require("express");
const router=express.Router();
const Url = require("../models/urlmodel.js");
router.get("/", async (req, res) => {
    const urls = await Url.find();

    res.render("home", {
        urls,
        shorturl: null
    });
});
module.exports=router;