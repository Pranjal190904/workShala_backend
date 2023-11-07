const express=require('express');
const controls=require('../controllers/user.controls');

const router=express();

router.post('/register', controls.userReg); //router for user registration
router.post('/login', controls.userLogin); //router for user login
router.post('/refreshToken', controls.refreshToken); //router to generate new access and refresh token
router.post('/verifyEmail',controls.verifyEmail);//router to verify user email
router.post('/changePassword', controls.changePassword);//router to change password
router.post('/forgotPassword',controls.forgotPassword);//router to reset password
router.post('/verifyOtp',controls.verifyOtp);//router to verify otp
router.post('/setNewPassword',controls.setNewPassword);//router to set new password

module.exports=router;