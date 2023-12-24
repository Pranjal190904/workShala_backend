const cloudinary=require("cloudinary");
require('dotenv').config();

const cloudName=process.env.cloudName;
const apiKey=process.env.apiKey;
const apiSecret=process.env.apiSecret

//configuring cloudinary
cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
})

module.exports=cloudinary;