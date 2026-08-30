const mongoose = require ('mongoose')
const nodemailer = require('nodemailer')
require('dotenv').config();
const connectDB = async () => {

    try{
        await mongoose.connect(process.env.BASE_URL);
        console.log("Database Connected")
    }catch{
        console.log("err")
    }
} 

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS

    }
})

module.exports = {connectDB,transporter};