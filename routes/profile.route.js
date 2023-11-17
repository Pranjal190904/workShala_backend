const express=require('express');
const {showProfile}=require("../controllers/profile.controls")

const router=express();

//router for showing user profile
router.get('/profile',showProfile);

module.exports=router;