const shortid=require('shortid');
const URL=require('../model/url');


const handleGenerateNewShortId=async(req,res)=>{
    const body=req.body;

    if(!body)return res.status(400).json({error:"URL is required"});
    const shortId=shortid();
    const url=await URL.create({
        shortId:shortId,
         redirectURL:body.url,
         visitHistory:[]
    });
    if(url){
        return res.render("home",{id:shortId});
    }
}

const renderHandler=async(req,res)=>{
    const shortId=req.params.shortId;
   const entry= await URL.findOneAndUpdate({shortId:shortId},{
        $push:{
            visitHistory:{
                timestamp:new Date().getTime()
            }
        }
    });
    console.log(entry.redirectURL);
     return res.redirect(entry.redirectURL===undefined?"/":entry.redirectURL);
};

module.exports={handleGenerateNewShortId,renderHandler};