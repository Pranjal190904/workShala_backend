const mongoose=require('mongoose');

//schema to store otp for sometime in db
const otpSchema=mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    otp: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
    }
});

module.exports=mongoose.model("otp", otpSchema);