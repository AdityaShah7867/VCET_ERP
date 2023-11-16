const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required:true
        },
        password:{
            type: String,
            required:true
        },
        name:{
            type: String,
            required:false
        },
        userType: {
            type: String,
            enum:["teacher","student","admin"],
            default:"student"
        },
        verificationToken:{
            type: String
        },
        isVerified:{
            type: Boolean,
            default:false
        }
    }
)

module.exports = mongoose.model('User', userSchema)