const { Teacher } = require('../Models/Teacher.models')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const RegisterTeacher = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        const user = await Teacher.findOne({
            email: email
        })

        if (user) {
            res.status(400).json({
                message: "Teacher already exists"
            })
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const newTeacher = await Teacher.create({
            name: name,
            email: email,
            password: hashedpassword
        })


        res.status(200).json({
            message: "New teacher created"
            ,
            teacher: newTeacher
        })

    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: "error",
            error: error
        })
    }
}

const loginTeacher = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await Teacher.find({
            email: email
        })

        if (!user) {
            res.status(401).json({
                message: "user not found",

            })
        }

        const compare = await bcrypt.compare(password, user.password);

        if (!compare) {
            res.status(400).json({
                message: "Incorrect password",
            })
        } else {
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name
            }, process.env.JWT)


            res.status(200).json({
                message: "user logged in",
                token: token
            })

        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: error
        })
    }
}

module.exports = {
    RegisterTeacher,
    loginTeacher
}