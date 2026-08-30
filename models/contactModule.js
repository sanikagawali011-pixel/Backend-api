const mongoose = require("mongoose");
const contactSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
        },
        mobile_number:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true,
            trim:true
        },
        status:{
            type:String,
            enum:["open","closed"]
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Enquiry",contactSchema)