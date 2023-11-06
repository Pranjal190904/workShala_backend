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
        const {email,password,firstName,lastName}=req.body; //data received from client side

        const checkUser=await userModel.findOne({email: email});  //checking if user already exist
        if(checkUser)
        {
            res.json({message:"User already exist"});
            return ;
        }
        const salt=10;
        const hashedPswrd=await bcrypt.hash(password, salt); //hashing password for storing in server
        const user=new userModel({
            email: email,
            password: hashedPswrd,
            firstName: firstName,
            lastName: lastName,
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
        res.status(500).json({message:"Server Error",error:err.message}); 
    }
}

//function to verify otp
async function verifyEmail(req,res)
{
    const {email,otp}=req.body;
    const otpVerify=await otpModel.findOne({email: email});
    if(!otpVerify)
    {
        res.json({message:"email not registered."});
        return ;
    }
    if(otp!=otpVerify.otp)
    {
        res.json({message:"entered otp is incorrect"});
        return ;
    }
    await userModel.findOneAndUpdate({email: email},{isVerified: true,});
    await otpModel.findOneAndDelete({email: email});
    res.json({message: "user verified successfully."});
}

//function for user login
async function userLogin(req,res)
{
    const {email,password}=req.body;
    const user=await userModel.findOne({email: email});
    if(!user)
    {
        res.status(404).json({message:"user not found"});
        return ;
    }
    const matchPswrd=await bcrypt.compare(password,user.password);
    if(matchPswrd)
    {
        const accessToken=await signAccessToken(user.id);
        const refreshToken=await signRefreshToken(user.id);
        res.json({
            accessToken: accessToken,
            refreshToken: refreshToken,
        })
    }
}


//function to generate new access token using refresh token
async function refreshToken(req,res)
{
    const {refToken}=req.body;
    const userId=await verifyRefreshToken(refToken);
    const accessToken=await signAccessToken(userId);
    const refreshToken=await signRefreshToken(userId);
    res.json({
        accessToken:accessToken,
        refreshToken:refreshToken,
    });
}

module.exports={userReg,userLogin,refreshToken,verifyEmail};