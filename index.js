const express=require('express');
const dbConnect=require('./connect/dbConnect')
const urlRoute=require('./Route/url');
const URL=require('./model/url');
const userRoute=require('./Route/user');
const staticRouter=require('./Route/staticsRouter');
const path=require('path');
const cookieParser=require('cookie-parser');
const restrictToLogin=require('./middlerware/auth');


dbConnect;
const app=express();


app.set("view engine","ejs");
app.set("views",path.resolve("./view"));





app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url",restrictToLogin,urlRoute);
app.use("/user",userRoute);
app.use("/",staticRouter);

app.get("/api/test",async(req,res)=>{
    const allurl=await URL.find({});
    return res.render("home",{urls:allurl});
})





app.listen(8000,()=>{
    console.log("Server Started");
});