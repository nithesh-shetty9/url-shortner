const express = require("express");
const router = express.Router(); //router is a function which is used to create new router object

const { postdata, getdata } = require("../controllers/urlcontrollers"); //for that particular route we are importing the controller functions

router.post("/", postdata); //url is /url and postdata is the function which will handle the post request
router.get("/analytics/:shortid", getdata); //url is /url/analytics/:shortid and getdata is the function which will handle the get request
module.exports = router;
