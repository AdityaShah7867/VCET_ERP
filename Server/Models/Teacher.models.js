const mongoose = require('mongoose')

const teacherModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const Teacher = mongoose.model('teacherModel', teacherModel)
module.exports = {
    Teacher
}