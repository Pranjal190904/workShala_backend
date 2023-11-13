const companyModel=require("../models/company.model");

//function to send company data to client
async function companyData(req,res)
{
    try{
        const companies=await companyModel.find({});
        res.status(200).json(companies);
    }
    catch(err)
    {
        res.status(500).json({message:"server error"});
    }
}

module.exports={companyData};