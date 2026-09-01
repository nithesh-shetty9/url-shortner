const express = require("express");
const app = express();
const port = 8001;
const Url = require("./models/urlmodel.js");
const connectDB = require("./config/urlconfig.js");
const middleware1 = require("./middleware/urlmiddleware.js");
app.use(middleware1.jsonMiddleware);
app.use(middleware1.urlencodedMiddleware);
const staticrouter =require("./routes/staticrouter.js");
app.use("/", staticrouter);
const router = require("./routes/urlroues.js");
app.set("view engine","ejs");
app.set("views","./views")
app.get("/test", async (req, res) => {
  const urls = await Url.find();

  return res.render('home',{
    urls: urls
  });
});

app.use("/url", router);
app.get("/url/:shortid", async (req, res) => {
  const shortid = req.params.shortid;
  const url = await Url.findOneAndUpdate(
    { shortCode: shortid },
    { $inc: { clicks: 1 } },
    { new: true },
  );
  if (!url) {
    return res.status(404).json({
      message: "URL not found",
    });
  }

  return res.redirect(url.originalUrl);
});
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("server started at " + port);
    });
  })
  .catch((error) => {
    console.log("failed to connect to server");
  });
