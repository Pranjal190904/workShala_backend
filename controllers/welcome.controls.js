const userModel=require("../models/user.model")
require('dotenv').config();
const jwt=require("jsonwebtoken");

//function to store user profile data in database
async function profileData(req,res)
{
    try{
        const {workStatus,skills}=req.body;
        const token=req.cookies.accessToken;
        console.log(token);
        if(!token)
        {
            res.status(401).json({message:"unauthorized"});
            return ;
        }
        jwt.verify(token, process.env.accesTokenSecretKey,async (err,payload)=>{
            if(err)
            {
                res.status(401).json({message:"unauthorized"});
                return ;
            }
            const userId=payload.aud;
            const user=await userModel.findOneAndUpdate({_id:userId},{workStatus:workStatus,skills:skills});
            res.status(201).json({message:"skills and work status added successfully."})
        });
    }
    catch(err)
    {
        res.status(500).json({message:"server error."});
    }
}

module.exports={profileData};