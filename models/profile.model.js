const mongoose=require("mongoose");

//schema for user profile
const profileSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdata"
    },
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
    },
    workStatus:{
        type:String
    },
    skills:{
        type:Array
    }
})

module.exports=mongoose.model("userProfile",profileSchema);