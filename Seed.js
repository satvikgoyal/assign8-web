const userData =  require("./models/userData");

const users = [
    {
        name:"user1",
        email:"user1@gmail.com",
        phone:"9876543210",
    },
    {
        name:"user2",
        email:"user2@gmail.com",
        phone:"9876543210",
        checkIn:new Date().toLocaleTimeString(),
        status:"true"
    },
    {
        name:"user3",
        email:"user3@gmail.com",
        phone:"9876543210",
        status:"true"
    },
    {
        name:"user4",
        email:"user4@gmail.com",
        phone:"9876543210",
        checkOut:new Date().toLocaleTimeString()
    }
];

const seedData = async()=>{
    await userData.deleteMany({});
    await userData.insertMany(users);
}

module.exports=seedData;