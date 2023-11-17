const profileModel=require("../models/profile.model");
const jwt=require("jsonwebtoken");
require("dotenv").config();

//function to show user profile
async function showProfile(req,res)
{
    try{
        if(!req.headers['authorization'])
        {
            res.status(401).json({message:"Unauthorized"});
            return ;
        }
        const authHeader=req.headers['authorization'];
        const token=authHeader.split(' ')[1];
        jwt.verify(token,process.env.accesTokenSecretKey,async (err,payload)=>{
            if(err)
            {
                res.status(401).json({message:"Unauthorized"});
                return ;
            }
            const userId=payload.aud;
            const profile=await profileModel.findOne({userId:userId});
            res.status(200).json({name:profile.name,email:profile.email,skills:profile.skills});
        })
    }
    catch(err)
    {
        res.status(500).json({message:"server error"});
    }
}

module.exports={showProfile};