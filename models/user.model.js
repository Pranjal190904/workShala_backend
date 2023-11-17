const mongoose= require("mongoose");

//Schema for user registration
const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        phone:{
            type:Number,
            require:true
        },
        email:{
            type: String,
            require: true,
            lowercase: true,
            unique: true,
        },
        password:{
            type: String,
            require: true,
        },
        isVerified:{
            type: Boolean,
            require: true,
            default: false,
        },
        workStatus:{
            type:String,
        },
        skills:{
            type:Array,
        }
    }
)

module.exports=mongoose.model("userdata", userSchema); //exported userdata model
