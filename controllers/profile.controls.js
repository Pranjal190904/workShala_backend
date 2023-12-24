const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken");
const cloud=require("../utils/cloud");
require("dotenv").config();

//function to show user profile
async function showProfile(req,res)
{
    try{
        const token=req.cookies.accessToken;
        console.log(token);
        if(!token)
        {
            res.status(401).json({message:"Unauthorized"});
            return ;
        }
        jwt.verify(token,process.env.accesTokenSecretKey,async (err,payload)=>{
            if(err)
            {
                res.status(401).json({message:"Unauthorized"});
                return ;
            }
            const userId=payload.aud;
            const profile=await userModel.findOne({_id:userId});
            res.status(200).json({name:profile.name,email:profile.email,skills:profile.skills,photoUrl:profile.photoUrl});
        })
    }
    catch(err)
    {
        res.status(500).json({message:"server error"});
    }
}

//function to upload user profile photo
async function uploadPhoto(req,res)
{
    try{
        const token=req.cookies.accessToken;
        console.log(token);
        if(!token)
        {
            res.status(401).json({message:"Unauthorized"});
            return ;
        }
        jwt.verify(token,process.env.accesTokenSecretKey,async (err,payload)=>{
            if(err)
            {
                res.status(401).json({message:"Unauthorized"});
                return ;
            }
            const uploaded=await cloud.v2.uploader.upload(req.file.path);
            const photoUrl=uploaded.secure_url;
            console.log(photoUrl);
            const userId=payload.aud;
            const profile=await userModel.findOneAndUpdate({_id:userId},{photoUrl:photoUrl});
            res.status(200).json({message:"profile photo uploaded successfully."});
        })
    }
    catch(err)
    {
        res.status(500).json({message:"server error"});
    }
}
module.exports={showProfile,uploadPhoto};