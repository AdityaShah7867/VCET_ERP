const express = require("express");
const router = express.Router();
const {verifyToken} = require('../Middleware/VerifyUser'); 
const {docmailapi} = require("../Controller/RequestDoc")


router.post('/reqdoc',verifyToken,docmailapi)

module.exports = router;