const mongoose=require("mongoose");

//Schema for internship data
const internshipSchema=mongoose.Schema({
    company:{
        type:String,
    },
    jobProfile:{
        type:String,
    },
    title:{
        type:String,
    },
    state:{
        type:String,
    },
    work:{
        type:String,
    },
    time:{
        type:String,
    },
    salary:{
        type:String,
    },
    type:{
        type:String,
    },
    description:{
        type:String,
    }
});

module.exports=mongoose.model("internshipData",internshipSchema);