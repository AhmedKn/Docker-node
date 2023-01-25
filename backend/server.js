const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
const bodyParser = require('body-parser');
const fs=require('fs');
const connectDB=require('./config/connectDB')
//.env config
dotenv.config();

//middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended:false
}))
connectDB();
app.get('/',(req,res)=>{
    res.send("Hello Docker hhh");
})

app.listen(process.env.PORT,(err)=> err?console.log(err):console.log(`server is running on ${process.env.PORT}`));