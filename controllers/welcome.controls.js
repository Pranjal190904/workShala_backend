const profileModel=require("../models/profile.model")
require('dotenv').config();
const jwt=require("jsonwebtoken");

//function to store user profile data in database
async function profileData(req,res)
{
    try{
        const {workStatus,skills}=req.body;
        if(!req.headers['authorization'])
        {
            res.status(401).json({message:"unauthorized"});
            return ;
        }
        const authHeader=req.headers['authorization'];
        const token=authHeader.split(' ')[1];
        jwt.verify(token, process.env.accesTokenSecretKey,async (err,payload)=>{
            if(err)
            {
                res.status(401).json({message:"unauthorized"});
                return ;
            }
            const userId=payload.aud;
            const profile=new profileModel({
                userId:userId,
                workStatus:workStatus,
                skills:skills
            });
            await profile.save();
            res.status(201).json({message:"skills and work status added successfully."})
        });
    }
    catch(err)
    {
        res.status(500).json({message:"server error."});
    }
}

module.exports={profileData};