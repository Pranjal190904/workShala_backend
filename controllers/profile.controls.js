const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken");
require("dotenv").config();

//function to show user profile
async function showProfile(req,res)
{
    try{
        const token=req.cookies.accessToken;
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
            res.status(200).json({name:profile.name,email:profile.email,skills:profile.skills});
        })
    }
    catch(err)
    {
        res.status(500).json({message:"server error"});
    }
}

module.exports={showProfile};