const express=require("express");

const controls=require("../controllers/company.controls");
const router=express();

router.get("/companyData",controls.companyData); //router to send company data to client

module.exports=router;