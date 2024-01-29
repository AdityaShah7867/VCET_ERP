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
    },
    teacherName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        required: true
    }
})


const requestModel = mongoose.model('requestModel', requestCertificateSchema);

module.exports = {
    requestModel
}