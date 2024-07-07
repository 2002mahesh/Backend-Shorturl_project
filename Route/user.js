const express=require('express');
const router=express.Router();
const {handleUserSignUp,loginHandler}=require('../controller/user')

router.post("/",handleUserSignUp);
router.post("/login",loginHandler);

module.exports=router;