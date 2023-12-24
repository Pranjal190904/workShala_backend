const mongoose= require("mongoose");

//Schema for user registration
const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        phone:{
            type:String,
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
        },
        photoUrl:{
            type:String,
            default: "https://res.cloudinary.com/dw6jj0t6z/image/upload/v1703406134/bgearbfemdeqputjzsth.jpg",        }
    }
)

module.exports=mongoose.model("userdata", userSchema); //exported userdata model
