const express=require("express");
const controls=require("../controllers/internship.controls");

const router=express();

router.get("/internshipData",controls.internshipData);//router to send internshipData

module.exports=router;