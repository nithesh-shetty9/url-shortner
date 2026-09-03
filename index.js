const express = require("express");
const app = express();
const port = 8001;
//accesing datas stored in database
const Url = require("./models/urlmodel.js"); //MODEL SCHEMA
const connectDB = require("./config/urlconfig.js"); //DB CONNECTION
const {validateuser,checkauth}=require("./middleware/auth.middleware.js")
//middlware accessing and usi
const middleware1 = require("./middleware/urlmiddleware.js");
app.use(middleware1.jsonMiddleware);
app.use(middleware1.urlencodedMiddleware);
app.use(middleware1.cookieparser());


const staticrouter = require("./routes/staticrouter.js");
app.use("/",checkauth, staticrouter);
app.set("view engine", "ejs");
app.set("views", "./views");

const router = require("./routes/urlroues.js");
app.use("/url",validateuser, router);
const userrouter=require("./routes/user.route.js");
app.use("/user",userrouter);

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
    console.error("Failed to start server:", error.message);
    process.exitCode = 1;
  });
