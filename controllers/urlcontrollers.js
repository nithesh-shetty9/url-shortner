const { nanoid } = require("nanoid"); //shortid is a package which is used to generate unique id for each url

const Url = require("../models/urlmodel.js");

const postdata = async (req, res) => {
  const body = req.body; //body is an object which contains the data sent by the client in the request body
  const urls = await Url.find();

  if (!body || !body.url)
    return res.status(400).json({ status: "url is required" }); //if body is empty or url is not present in the body then return 400 status code with message url is required
  const existingUrl = await Url.findOne({
    originalUrl: req.body.url,
    createdBy: req.user._id
  });
  if (existingUrl) {
    return res.render("home", {
      urls: await Url.find({ createdBy: req.user._id }),
      shorturl: existingUrl.shortCode,
    });
  }
  const shorturl = nanoid(8);
  await Url.create({
    shortCode: shorturl,
    originalUrl: body.url,
    createdBy:req.user._id
  });
  return res.render("home", {
    urls: await Url.find({ createdBy: req.user._id }),
    shorturl: shorturl,
  });
};
const getdata = async (req, res) => {
  const shortCode = req.params.shortid;
  const user = await Url.findOne({ shortCode });
  if (!user) {
    return res.status(404).json({
      message: "Short URL not found",
    });
  }
  return res.status(200).json({
    clicks: user.clicks,
  });
};
module.exports = {
  postdata,
  getdata,
};
