const express=require("express");
const app=express();
const port=8001;
const connectDB=require("./config/urlconfig.js");
connectDB().then(()=>{
    app.listen(port,()=>{
        console.log("server started at "+port);
    })
}).catch((error)=>{
    console.log("failed to connect to server");
}
)