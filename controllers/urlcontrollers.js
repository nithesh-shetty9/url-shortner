const { nanoid } = require("nanoid");
const Url = require("../models/urlmodel.js");
const postdata = async (req, res) => {
  const body = req.body;
  if (!body || !body.url)
    return res.status(400).json({ status: "url is required" });
  const shorturl = nanoid(8);
  await Url.create({
    shortCode: shorturl,
    originalUrl: body.url,
  });
  return res.status(201).json({
    message: "Short URL created",
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
