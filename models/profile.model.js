const mongoose=require("mongoose");

//schema for user profile
const profileSchema=mongoose.Schema({
    email:{
        type:String
    },
    workStatus:{
        type:String
    },
    skills:{
        type:Array
    }
})

module.exports=mongoose.model("userProfile",profileSchema);