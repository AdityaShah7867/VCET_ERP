const mongoose = require('mongoose')

const requestCertificateSchema = new mongoose.Schema({
    studentEmail: {
        type: String,
        required: true
    },
    certificateName: {
        type: String,
        required: true
    },
    certificateRecieved: {
        type: Boolean,
        default: false
    }
})



const requestModel = mongoose.model('requestModel', requestCertificateSchema);

module.exports = {
    requestModel
}