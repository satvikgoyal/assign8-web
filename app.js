const { urlencoded } = require("express");
const express = require("express");
const app=express();
const router = require("./routers/userRouters");
const methodOverride = require("method-override");
const seedData = require("./Seed");
require("dotenv").config();

const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/trackingdata").then(()=>{
    console.log("database connected successfuly");
}).catch(()=>{
    console.log("database not connected");
});


const path =  require("path");

app.set("view engine","ejs");
app.use(urlencoded({extended:true}));
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'));
app.use(router);


//seeding database
// seedData();

// app.get("/",(req,res)=>{
//     // res.send("connected");
//     res.render("./tracker/index");
// })



app.listen(5000,()=>{
    console.log("Listening to port no. 5000");
})