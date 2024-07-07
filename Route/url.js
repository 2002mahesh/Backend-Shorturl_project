const express=require('express');
const {handleGenerateNewShortId,renderHandler}=require('../controller/url');
const router=express.Router();

router.post("/",handleGenerateNewShortId);
router.get("/:shortId",renderHandler);


module.exports=router;

