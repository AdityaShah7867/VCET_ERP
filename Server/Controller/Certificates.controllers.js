const { certificates } = require('../Models/Certification.models');
const User = require('../Models/User');
const { requestModel } = require('../Models/RequestCertificate')
const { ReqDoc } = require('../Util/mail')

const getCertificatesById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate('certificates');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }


        return res.status(200).json({
            success: true,
            message: "Certificates fetched successfully",
            data: user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


const createCertificates = async (req, res) => {
    const userId = req.user.id;

    const file = req.file;

    try {
        const {
            name,
            description,
            position,
            certificateId
        } = req.body;


        if (!file) {
            return res.status(400).json({
                success: false,
                message: "File is required"
            })
        }

        if (!name || !description || !position) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (certificateId) {
            const certificateRequest = await requestModel.findById(certificateId);
            if (!certificateRequest) {
                return res.status(404).json({
                    success: false,
                    message: "Request not found"
                })
            }

            certificateRequest.certificateRecieved = true;

            await certificateRequest.save();
        }

        const newCertificates = new certificates({
            name,
            file: req.file.path,
            isVerified: false,
            user: userId,
            description,
            position
        })

        await newCertificates.save();

        user.certificates.push(newCertificates._id);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Certificates created successfully",
            data: newCertificates
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


const verifyCertificate = async (req, res) => {
    const { certificateId } = req.params;
    try {

        const certificate = await certificates.findById(certificateId);

        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            })
        }

        certificate.isVerified = true;

        await certificate.save();

        return res.status(200).json({
            success: true,
            message: "Certificate verified successfully",
            data: certificate
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const deleteCertificates = async (req, res) => {
    const { certificateId } = req.params;
    const userId = req.user.id;
    try {

        const certificate = await certificates.findById(certificateId);

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })

        }

        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            })
        }


        await certificates.findByIdAndDelete(certificates);


        user.certificates.pull(certificateId);

        await user.save();

        return res.status(200).json({

            success: true,
            message: "Certificate deleted successfully",
            data: certificate
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


const getAllCertificates = async (req, res) => {
    const userId = req.user.id;
    try {

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const certificate = await certificates.find({ user: userId });

        return res.status(200).json({
            success: true,
            message: "Certificate fetched successfully",
            data: certificate
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


const getAllCertificatesAdmin = async (req, res) => {
    const userID = req.user.id;

    try {

        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (user.userType !== "admin") {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to perform this action"
            })
        }

        const certificate = await certificates.find({});

        return res.status(200).json({
            success: true,
            message: "Certificate fetched successfully",
            data: certificate
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


const requestCertificate = async (req, res) => {
    const { email, desc } = req.body;
    try {

        const { id } = req.user;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (user.userType !== "teacher") {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to perform this action"
            })
        }

        if (!email || !desc) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        await ReqDoc(user.name, email, desc).then(() => {
            const
                newRequest = new requestModel({
                    studentEmail: email.toLowerCase(),
                    certificateName: desc
                });

            newRequest.save();
            return res.status(201).json({
                success: true,
                message: `Mail sent to ${email}`,
                data: newRequest
            })
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}



const getCertificateRequest = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const request = await requestModel.find({ studentEmail: user.email, certificateRecieved: false });
        return res.status(200).json({
            success: true,
            message: "Request fetched successfully",
            data: request
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}


module.exports = {
    createCertificates,
    verifyCertificate,
    deleteCertificates,
    getAllCertificates,
    getAllCertificatesAdmin,
    getCertificatesById,
    requestCertificate,
    getCertificateRequest
}