const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name : {
            type:String,
            required:true
        },
        email : {
            type:String,
            required:true,
            unique:true
        },
        password : {
            type:String,
            required:true
        },
        mobile_number : {
            type:Number,
            required:true,
            unique:true
        },
        age : {
            type:Number,
            required:false
        },
        roll_no : {
            type:Number,
            required:true,
            unique:true
        },
        role:{
            type:String,
            required:true,
            enum:["user","Admin"],
            default:"user"
        }

    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User",userSchema);