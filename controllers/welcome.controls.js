const profileModel=require("../models/profile.model")

//function to store user profile data in database
async function profileData(req,res,email)
{
    try{
        const {email,workStatus,skills}=req.body;
        const profile=new profileModel({
            email:email,
            workStatus:workStatus,
            skills:skills
        });
        await profile.save();
        res.status(201).json({message:"skills and work status added successfully."})
    }
    catch(err)
    {
        res.status(500).json({message:"server error."});
    }
}

module.exports={profileData};