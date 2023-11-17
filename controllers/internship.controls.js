const internshipModel=require("../models/internship.model");

//function to send internship data
async function internshipData(req,res){
    try{
        const internships=await internshipModel.find({});
        res.status(200).json(internships);
    }
    catch(err)
    {
        res.status(500).json({message:"server error"});
    }
}

module.exports={internshipData};