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

module.exports={signAccessToken,signRefreshToken};