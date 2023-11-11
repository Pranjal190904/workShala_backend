const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const {signAccessToken,signRefreshToken}=require('../utils/genToken');
const {verifyAccessToken,verifyRefreshToken}=require('../utils/verifyToken');
const {sendmail}=require('../utils/mailer');
const otpModel=require("../models/otp.model")

//function for user registration
async function userReg(req,res)
{
    try{
        const {name,phone,email,password}=req.body; //data received from client side

        const checkUser=await userModel.findOne({email: email});  //checking if user already exist
        if(checkUser)
        {
            res.status(400).json({message:"User already exist"});
            return ;
        }
        const salt=10;
        const hashedPswrd=await bcrypt.hash(password, salt); //hashing password for storing in server
        const user=new userModel({
            name:name,
            phone:phone,
            email: email,
            password: hashedPswrd
        });
        const savedUser=await user.save(); //user data saved in server
        const accessToken=await signAccessToken(savedUser.id);
        const refreshToken=await signRefreshToken(savedUser.id);
        const otp=Math.ceil(Math.random()*8999+1000);
        const newOtp=new otpModel({
            email: email,
            otp: otp,
        });
        await newOtp.save();
        await sendmail(email,otp);
        res.status(201).json({
            message:"user added successfully, please verify your email.",
            accessToken:accessToken,
            refreshToken:refreshToken,
        }); 
    }
    catch(err){
        res.status(500).json({message:"Server Error"}); 
    }
}

//function to verify email
async function verifyEmail(req,res)
{
    try{
        const {email,otp}=req.body;
        const otpVerify=await otpModel.findOne({email: email});
        if(!otpVerify)
        {
            res.status(404).json({message:"email not registered."});
            return ;
        }
        if(otp!=otpVerify.otp)
        {
            res.status(401).json({message:"entered otp is incorrect"});
            return ;
        }
        await userModel.findOneAndUpdate({email: email},{isVerified: true,});
        await otpModel.findOneAndDelete({email: email});
        res.status(200).json({message: "user verified successfully."});
    }
    catch(err){
        res.status(500).json({message:"server error."});
    }
}

//function for user login
async function userLogin(req,res)
{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email: email});
        if(!user)
        {
            res.status(404).json({message:"user not found"});
            return ;
        }
        const matchPswrd=await bcrypt.compare(password,user.password);
        if(!matchPswrd)
        {
            res.status(401).json({message:"password incorrect."});
            return ;
        }
        if(matchPswrd)
        {
            const accessToken=await signAccessToken(user.id);
            const refreshToken=await signRefreshToken(user.id);
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
            })
        }
    }
    catch(err)
    {
        res.status(500).json({message:"server error."});
    }
}


//function to generate new access token using refresh token
async function refreshToken(req,res)
{
    try{    
        const {refToken}=req.body;
        const userId=await verifyRefreshToken(refToken);
        const accessToken=await signAccessToken(userId);
        const refreshToken=await signRefreshToken(userId);
        res.status(200).json({
            accessToken:accessToken,
            refreshToken:refreshToken,
        });
    }
    catch(err)
    {
        res.status(500).json({message:"server error."});
    }
}

//function to change password
async function changePassword(req,res)
{
    try{
        const {email,password,newPassword}=req.body;
        const user=await userModel.findOne({email:email});
        if(!user)
        {
            res.status(404).json({message:"user not found"});
            return ;
        }
        const matchPassword=await bcrypt.compare(password,user.password);
        if(!matchPassword)
        {
            res.status(401).json({message:"entered current password incorrect"});
            return ;
        }
        const hashedPswrd=await bcrypt.hash(newPassword,10);
        await userModel.findOneAndUpdate({email:email},{password:hashedPswrd});
        res.status(200).json({message:"password updated successfully."})
    }
    catch(err)
    {
        res.status(500).json({message:"server error."});
    }
}

//function to reset password if user forget it
async function forgotPassword(req,res)
{
    try
    {
        const {email}=req.body;
        const user=await userModel.findOne({email:email});
        if(!user)
        {
            res.status(404).json({message:"user not registered."});
            return ;
        }
        const otp=Math.ceil(Math.random()*8999+1000);
        const newOtp=new otpModel({
            email: email,
            otp: otp,
        });
        await newOtp.save();
        await sendmail(email,otp);
        res.status(200).json({message:"OTP sent successfully to your registered email."})
    }
    catch(err)
    {
        res.status(500).json({message:"server error."});
    }
}

//function to verify otp
async function verifyOtp(req,res)
{
    try
    {
        const {email,otp}=req.body;
        const otpVerify=await otpModel.findOne({email:email});
        if(!otpVerify)
        {
            res.status(404).json({message:"otp expired"});
            return ;
        }
        if(otpVerify.otp!=otp)
        {
            res.status(401).json({message:"incorrect otp entered"});
            return ;
        }
        await otpModel.findOneAndDelete({email:email});
        res.status(200).json({message:"otp verified successfully."});
    }
    catch(err)
    {
        res.status(500).json({message:"server error."});
    }
}

//function to set new password
async function setNewPassword(req,res)
{
    try
    {
        const {email,newPassword}=req.body;
        const user=await userModel.findOne({email:email});
        if(!user)
        {
            res.status(404).json({message:"user not found."});
            return ;
        }
        const hashedPswrd=await bcrypt.hash(newPassword,10);
        await userModel.findOneAndUpdate({email:email},{password:hashedPswrd});
        res.status(200).json({message:"password reset successful."});
    }
    catch(err)
    {
        res.status(500).json({message:"server error."});
    }
}

module.exports={userReg,userLogin,refreshToken,verifyEmail,changePassword,forgotPassword,verifyOtp,setNewPassword};