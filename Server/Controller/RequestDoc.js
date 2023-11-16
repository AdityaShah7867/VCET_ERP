const User = require("../Models/User")
const {ReqDoc} = require("../Util/mail")



const docmailapi = async (req, res) => {
    const { email, desc} = req.body;

    if (!email || !desc ) {
        return res.status(401).json('All values not fulfilled');
    }

    try {
        await ReqDoc(req.user.name,email,desc)
        return res.status(201).json({message:`mail sent to ${email}`});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports= {docmailapi}