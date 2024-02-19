const express = require("express")
const router = express.Router()
const { verifyToken } = require("../Middleware/VerifyUser")
const { register, login, getLoggedinUser, verifyemail, getStudentsByYear } = require("../Controller/Auth")


router.post('/register', register)
router.post('/login', login)
router.get('/getLoggedinUser', verifyToken, getLoggedinUser)
router.get('/emailverify/:token', verifyemail)
router.get('/students/:year', getStudentsByYear)


module.exports = router

