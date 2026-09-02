const express = require("express");
const jsonMiddleware = express.json();
const urlencodedMiddleware = express.urlencoded({ extended: true });
const cookieparser=require('cookie-parser');
module.exports = {
  jsonMiddleware,
  urlencodedMiddleware,
  cookieparser
};
