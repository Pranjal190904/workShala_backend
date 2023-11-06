const express=require('express');
const controls=require('../controllers/user.controls');

const router=express();

router.post('/register', controls.userReg); //router for user registration
router.post('/login', controls.userLogin); //router for user login
router.post('/refreshToken', controls.refreshToken); //router to generate new access and refresh token
router.post('/verifyEmail',controls.verifyEmail);//router to verify user email

module.exports=router;