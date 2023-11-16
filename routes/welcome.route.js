const express=require("express");
const {profileData}=require("../controllers/welcome.controls");

const router=express();

router.post("/welcome",profileData); //router for store user profile data

module.exports=router;