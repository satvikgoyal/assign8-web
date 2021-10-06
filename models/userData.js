const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:"String",
        require:"true",
        trim:"true"
    },
    email:{
        type:"String",
        require:"true",
        trim:"true"
    },
    phone:{
        type:"Number",
        require:"true"
    },
    checkIn:{
        type:"String",
        default:new Date().toLocaleTimeString()
    },
    status:{
        type:"Boolean",
        default:false
    },
    checkOut:{
        type:"String",
        default:"0"
    }
});

const userData = mongoose.model("UserData",userSchema);

module.exports=userData;