const profileModel=require("../models/profile.model")
const userModel=require("../models/user.model")
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
            const checkUser=await profileModel.findOne({userId:userId});
            if(checkUser)
            {
                res.status(400).json({message:"user profile already exist."});
                return ;
            }
            const user=await userModel.findOne({_id:userId});
            const profile=new profileModel({
                userId:userId,
                name:user.name,
                email:user.email,
                phone:user.phone,
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