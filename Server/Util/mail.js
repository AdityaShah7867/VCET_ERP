const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const { ReqTemp, successFullVerification, gmailContent } = require('./emailTemplate');



const ReqDoc = async (TeacherName, recipientEmail, desc) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        })

        const emailcontent = ReqTemp(desc, TeacherName, 'http://localhost:3000/');
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: `${TeacherName} has requested Doc`,
            html: emailcontent
        })

        console.log("verification email has been sent")
    } catch (error) {
        console.log(error)
    }
}


const generateverificationToken = (email) => {
    console.log('token generated jwt')
    return jwt.sign({ email: email }, process.env.JWT, { expiresIn: '1d' })
}


const sendVerificationEmail = async (recipientEmail, verificationToken) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }

        })

        const emailcontent = gmailContent(verificationToken);
        console.log(process.env.EMAIL + "email this is")

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Email Verification',
            html: emailcontent
        })

        console.log("Verification email has been sent");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}


const SuccessfullyVerified = async (recipientEmail) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }

        })

        const emailcontent = successFullVerification(recipientEmail)

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Congratulations You Are Verified',
            html: emailcontent
        })

        console.log("Verification email has been sent");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}



module.exports = { ReqDoc, generateverificationToken, sendVerificationEmail, SuccessfullyVerified }