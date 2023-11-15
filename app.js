require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const routerUser=require('./routes/user.route');
const routerCompany=require("./routes/company.route");
const routerInternship=require("./routes/internship.route");
const cors=require("cors");

const app=express();

const port=process.env.PORT;
const dbUrl=process.env.DBURL;

mongoose.connect(`${dbUrl}`)
.then(()=>console.log("database connected successfully"))
.catch((err)=>console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(routerUser);
app.use(routerCompany);
app.use(routerInternship);

app.listen(port);
