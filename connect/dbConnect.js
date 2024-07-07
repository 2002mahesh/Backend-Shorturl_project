const mongoose=require('mongoose');

const dbConnect=mongoose.connect("mongodb://127.0.0.1:27017/short_url").then(()=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log(err);
});

module.exports=dbConnect;