const mongoose=require("mongoose");

//schema for company data
const companySchema=mongoose.Schema({
    img:{
        type:String,
    },
    title:{
        type:String,
    },
    location:{
        type:String,
    },
    industry:{
        type:String,
    },
    compantType:{
        type:String,
    },
    about:{
        type:String,
    }
}
)

module.exports=mongoose.model("companyData",companySchema);