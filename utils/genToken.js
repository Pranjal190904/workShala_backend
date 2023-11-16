const jwt=require('jsonwebtoken');
require('dotenv').config();

//function to generate access token
async function signAccessToken(id)
{
    return new Promise((resolve,reject)=>{
        const payload={
            aud:id
        }
        const secret=process.env.accesTokenSecretKey;
        const options={
            expiresIn: '1d',
        }
        jwt.sign(payload,secret,options,(err,token)=>{
            if(err) reject(err);
            resolve(token);
        })
    })
}


//function to generate refresh token
async function signRefreshToken(id)
{
    return new Promise((resolve,reject)=>{
        const payload={
            aud:id,
        }
        const secret=process.env.refreshTokenSecretKey;
        const options={
            expiresIn: '1y',
        }
        jwt.sign(payload,secret,options,(err,token)=>{
            if(err) reject(err);
            resolve(token);
        })
    })
}

//function to generate reset password token
async function signResetPasswordToken(email)
{
    return new Promise((resolve,reject)=>{
        const payload={
            aud:email
        }
        const secret=process.env.resetPasswordTokenSecretKey;
        const options={
            expiresIn:600
        }
        jwt.sign(payload,secret,options,(err,token)=>{
            if(err) reject(err);
            resolve(token);
        })
    })
}

module.exports={signAccessToken,signRefreshToken,signResetPasswordToken};