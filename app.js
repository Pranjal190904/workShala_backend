require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const router=require('./routes/user.route');

const app=express();

const port=process.env.PORT;
const dbUrl=process.env.DBURL;

mongoose.connect(`${dbUrl}`)
.then(()=>console.log("database connected successfully"))
.catch((err)=>console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(router);

app.listen(port);
