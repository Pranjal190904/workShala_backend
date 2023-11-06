const mongoose= require("mongoose");

//Schema for user registration
const userSchema=mongoose.Schema(
    {
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
        firstName:{
            type: String,
            require: true,
        },
        lastName:{
            type: String,
        },
        isVerified:{
            type: Boolean,
            require: true,
            default: false,
        },
        contact:{
            type:Number,
        },
        gender:{
            type:String,
            enum:["Male","Female","Other"],
        },
        languagesKnown:{
            type:Array,
        },
        skills:{
            type:Array,
        },
        preference:{
            type:Array,
        },
        position:{
            type:String,
        },
        currentCity:{
            type:String,
        },
        workLocation:{
            type:Array,
        }
    }
)

module.exports=mongoose.model("userdata", userSchema); //exported userdata model
