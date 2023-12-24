const express=require('express');
const {showProfile,uploadPhoto}=require("../controllers/profile.controls")
const upload=require("../middlewares/upload");

const router=express();

//router for showing user profile
router.get('/profile',showProfile);

//router for uploading user profile photo
router.post('/uploadPhoto',upload.single('photo'),uploadPhoto);

module.exports=router;