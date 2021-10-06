const express=require("express");
const router = express.Router();
const userData = require("../models/userData");
require("dotenv").config();

const accountSid=process.env.ACCOUNTSID;
console.log("accountSid: "+accountSid);
const authToken=process.env.AUTHTOKEN;

const client=require('twilio')(accountSid,authToken);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRIDAPI);


// const msg = {
//     to: 'test@example.com', // Change to your recipient
//     from: 'test@example.com', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })


router.get("/",(req,res)=>{
    res.render("./tracker/index");
})

router.post("/checkin",async(req,res)=>{
    const data={
        ...req.body,
        checkIn:new Date().toLocaleTimeString(),
        status:"true"
    };

    const user=await userData.create(data);
    console.log(user);

    client.messages.create({body:"User Checked In Successfuly",from:'+13343264119',to:`{+91${user.phone}}`}).then((message)=>{
        console.log("message"+message.sid)
    });

    console.log(`${user.email}`);

    const msg = {
        to: `${user.email}`, // Change to your recipient
        from: 'svsgoyal@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'user checked In successfuly',
        html: '<strong>user checked In successFully</strong>',
    }

    sgMail.send(msg).then(() => {
        console.log('Email sent')
    }).catch((error) => {
        console.error(error)
    })

    res.render("./tracker/checkOut",{user});
    // res.send("user checkIn succesfully");
});

router.patch("/checkout/:id",async(req,res)=>{
    const {id} = req.params;

    const user= await userData.findById(id);
    // console.log(user);

    await user.updateOne({$set:{status:"false"}});
    await user.updateOne({$set:{checkOut:new Date().toLocaleTimeString()}},{new:true});
    // await user.updateMany({status:"false"},{checkOut:new Date().toLocaleTimeString()})
    const updatedUser = await userData.findById(id);
    console.log(updatedUser);
    console.log(`+91${updatedUser.phone}`);

    client.messages.create({body:"User Checked Out Successfuly",from:'+13343264119',to:`+91${updatedUser.phone}`}).then((message)=>{
        console.log("message"+message.sid)
    });

    const msg = {
        to: `${user.email}`, // Change to your recipient
        from: 'svsgoyal@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'user checked In successfuly',
        html: '<strong>user checked out successFully</strong>',
    }

    sgMail.send(msg).then(() => {
        console.log('Email sent')
    }).catch((error) => {
        console.error(error)
    })

    res.render("./tracker/show",{updatedUser});
})

router.delete("/delete/:id",async(req,res)=>{
     const {id} = req.params;
     await userData.findByIdAndDelete(id);
     console.log("user deleted from database");
     res.redirect("/");
})

module.exports=router;