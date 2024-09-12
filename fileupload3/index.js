//app create 
const express=require('express');
const app=express();

// find PORT 
require('dotenv').config();
const PORT=process.env.PORT || 3000

//add mmiddleware
app.use(express.json());
const fileupload=require("express-fileupload"); //is fileupload middle ka use karke apne server par file upload karenge
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
}));

// connect db 

const db= require("./config/database");
db.connect();


//cluoud se connect
const cloudinary=require("./config/cloudinary"); //connecting from cloudinary
cloudinary.cloudinaryConnect();

//api route mount karna hai
const Upload=require("./routes/FileUpload");
app.use('/api/v1/upload',Upload);

//activete karna hia server

app.listen(PORT, ()=>{
    console.log(`App is runnig at ${PORT}`);
})