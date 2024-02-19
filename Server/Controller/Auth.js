const User = require("../Models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const { generateverificationToken, sendVerificationEmail, SuccessfullyVerified } = require('../Util/mail')


const register = async (req, res) => {
    try {
        const { email, password, name, year } = req.body;

        // if (!email.endsWith('@vcet.edu.in')) {
        //     res.status(400).json({ message: "Invalid email domain. Please use a valid @vcet.edu.in email address." });
        //     return;
        // }

        const existingUser = await User.findOne({
            email: email
        })

        console.log("1");
        if (existingUser) {
            res.status(401).json({ message: "user already exists" })
            return
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        if (!email || !password || !name || !year) {
            res.status(400).json({ message: "fill all the details" })
            return
        }
        console.log("2");

        const verificationToken = generateverificationToken(email);
        console.log("verificationToken")
        const newUser = await User.create({
            email: email.toLowerCase(),
            password: hashedpassword,
            year,
            name,
            verificationToken
        })
        res.status(201).json({ message: "user created succesfuly", newUser: newUser })
        await sendVerificationEmail(email, verificationToken);

    } catch (error) {
        res.status(501).json({ error: error })
    }
}

const verifyemail = async (req, res) => {
    try {
        const tokenId = req.params.token;
        const user = await User.findOne({ verificationToken: tokenId });

        if (!user) {
            return res.status(404).json({ error: 'Invalid verification token.' });
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        await SuccessfullyVerified(user.email);
        res.status(200).json({ message: "EMAIL VERIFIED" });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred during email verification.' });
        console.log(error);
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email
        })

        console.log(user)

        if (!user) {
            res.status(401).json({ message: "user does not exist" })
            return
        }

        if (!user.isVerified) {
            res.status(400).json({ message: "Please Verify Email First !" })
            return
        }

        const comparepassword = await bcrypt.compare(password, user.password)

        if (comparepassword) {
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name,
                year: user.year,

            }, process.env.JWT)

            res.status(200).json({ message: "user lpgged in", user: user, token: token })
            return
        }
        else {
            res.status(401).json({ message: "incorrect password" })
            return
        }


    } catch (error) {
        console.log(error)
        res.status(501).json({ error: error })
    }
}


const getLoggedinUser = async (req, res) => {
    try {

        const user = req.user;
        // console.log(user)

        res.status(200).json({ user: user })
    } catch (error) {

        res.status(501).json({ message: error })
    }
}

const getStudentsByYear = async (req, res) => {
    try {
        const year = req.params.year

        const students = await User.find({ year: year })
        res.status(200).json({ students: students })
    } catch (error) {
        res.status(501).json({ message: error })
    }
}


module.exports = { register, login, getLoggedinUser, verifyemail, getStudentsByYear }