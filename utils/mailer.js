const nodemailer=require('nodemailer');
require('dotenv').config();

//function to send mail
async function sendmail(email,otp)
{
    //created a mail transporter
    const transporter=nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: process.env.mailUser,
                pass: process.env.mailPass,
            }
        }
    )

    //configure mail content
    const mailOptions={
        from: process.env.mailUser,
        to: email,
        subject: "mail from workshala",
        html: `<p style="font-size: 25px" >Here is your OTP for verification.<br><b>OTP : ${otp}</b></p>`
    }

    //sending mail
    try{
        await transporter.sendMail(mailOptions);
        console.log("mail sent successfully");
    }
    catch(err){
        console.log(err);
    }
}

module.exports={sendmail};