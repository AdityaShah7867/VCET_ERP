const mongoose = require('mongoose')

const CertificatesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    file: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
    ,
    isVerified: {
        type: Boolean,
        default: false
    },

})


const certificates = mongoose.model(
    'Certificates',
    CertificatesSchema
)

module.exports = {
    certificates
}