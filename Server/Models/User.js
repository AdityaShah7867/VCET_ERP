const mongoose = require('mongoose')
const { certificates } = require('./Certification.models')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        userType: {
            type: String,
            enum: ["teacher", "student", "admin"],
            default: "student"
        },
        verificationToken: {
            type: String
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        certificates: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Certificates'
            }
        ]

    }
)

module.exports = mongoose.model('User', userSchema)