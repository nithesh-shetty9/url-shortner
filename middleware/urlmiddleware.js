const express = require("express");
const jsonMiddleware = express.json();
const urlencodedMiddleware = express.urlencoded({ extended: true });
module.exports={
    jsonMiddleware,
    urlencodedMiddleware
};