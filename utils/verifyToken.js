const jwt=require('jsonwebtoken');
require('dotenv').config();

//function to verfy access token
async function verifyAccessToken(req,res,next)
{
    if(!req.headers['authorization'])
    {
        res.json({message:"unauthorized"});
        return ;
    }
    const authHeader=req.headers['authorization'];
    const token=authHeader.split(' ')[1];
    jwt.verify(token, process.env.accesTokenSecretKey);
    next();
}

//function to verify refresh token
async function verifyRefreshToken(refreshToken)
{
    jwt.verify(refreshToken,process.env.refreshTokenSecretKey,(err,payload)=>{
        if(err)
        {
            res.json({message:"unauthorized user"});
            return ;
        }
        const userId=payload.aud;
        return userId;
    });
}

module.exports={verifyAccessToken,verifyRefreshToken};