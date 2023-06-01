const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
var newOTP = require("otp-generators");
const jwt = require("jsonwebtoken");
const authconfig = require("../configs/auth.config");
const authConfig = require("../configs/auth.config");

exports.signup = async (req, res) => {
    try {
        var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let OTP = '';
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 108)];
        }
        const data = {
            referalcode: OTP,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        };
        const user = await User.create(data);
        res.status(201).send({
            message: "registered successfully ",
            data: user,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: "internal server error " + err.message });
    }
};
exports.signupWithPhone = async (req, res) => {
    const { phone } = req.body;
    try {
        const user = await User.findOne({ phone });
        if (!user) {
            var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let referalcode = '';
            for (let i = 0; i < 6; i++) {
                referalcode += digits[Math.floor(Math.random() * 108)];
            }
            const userObj = {};
            userObj.phone = phone;
            userObj.referalcode = referalcode;
            userObj.otp = newOTP.generate(4, {
                alphabets: false,
                upperCase: false,
                specialChar: false,
            });
            userObj.otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
            const user = await User.create(userObj);
            res.status(200).send({
                message: "registered successfully ",
                data: user,
            });
        } else {
            res.status(409).send({ message: "Already Exist", data: [] });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.loginWithPhone = async (req, res) => {
    const { phone } = req.body;
    try {
        // Find the user in the database
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).send({ msg: "not found" });
        }
        const userObj = {};
        userObj.otp = newOTP.generate(4, {
            alphabets: false,
            upperCase: false,
            specialChar: false,
        });
        userObj.otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
        const updated = await User.findOneAndUpdate({ phone: phone }, userObj, {
            new: true,
        });
        res.status(200).send({
            userId: updated._id,
            otp: updated.otp,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }
        if (user.otp !== otp || user.otpExpiration < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        const accessToken = jwt.sign({ id: user._id }, authConfig.secret, {
            expiresIn: authConfig.accessTokenTime,
        });
        res.status(200).send({
            message: "logged in successfully",
            accessToken: accessToken,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: "internal server error" + err.message });
    }
};
exports.resendOTP = async (req, res) => {
    const { id } = req.params;
    try {
        // Check if the user already exists in the database
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }
        const otp = newOTP.generate(4, {
            alphabets: false,
            upperCase: false,
            specialChar: false,
        });
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
        const updated = await User.findOneAndUpdate(
            { _id: id },
            { otp, otpExpiration },
            { new: true }
        );
        console.log(updated);

        res.status(200).send({ message: "OTP resent", otp: otp });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" + error.message });
    }
};
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(404)
                .send({ message: "user not found ! not registered" });
        }
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).send({
                message: "Wrong password",
            });
        }
        const accessToken = jwt.sign({ id: user._id }, authConfig.secret, {
            expiresIn: authConfig.accessTokenTime,
        });
        res.status(201).send({ data: user, accessToken: accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" + error.message });
    }
};
exports.socialLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email});
        if (!user) {
            var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let referalcode = '';
            for (let i = 0; i < 6; i++) {
              referalcode += digits[Math.floor(Math.random() * 108)];
            }
            const obj = {
                referalcode: referalcode,
                email: req.body.email
             }
            const user = await User.create(obj);
            const accessToken = jwt.sign(
                { id: user.email },
                authConfig.secret,
                {
                    expiresIn: "24h",
                }
            );
            return res.status(200).send({
                msg: "logged in successfully",
                accessToken: accessToken,
                data: user,
            });
        }
        const accessToken = jwt.sign({ id: user.phone }, authConfig.secret, {
            expiresIn: "24h",
        });
        res.status(200).send({
            msg: "logged in successfully",
            accessToken: accessToken,
            data: user,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "internal server error",
            err: err.message,
        });
    }
};
const nodemailer = require("nodemailer");
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = newOTP.generate(4, {
            alphabets: false,
            upperCase: false,
            specialChar: false,
        });
        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(404)
                .send({ message: "user not found ! not registered" });
        } else {
            const user1 = await User.findOneAndUpdate(
                { email },
                { otp: otp, otpExpiration: Date.now() + 3600000 },
                { new: true }
            );
            // const transporter = nodemailer.createTransport({
            //     host: "smtp.gmail.com",
            //     port: 587,
            //     secure: false,
            //     auth: {
            //         user: "node2@flyweis.technology",
            //         pass: "ayesha@9818#",
            //     },
            // });
            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                auth: {
                    user: "frieda.smitham40@ethereal.email",
                    pass: "TURy68KCpFSsFyNfjs",
                },
            });
            // Define the email options
            const mailOptions = {
                to: email,
                from: "node2@flyweis.technology",
                subject: "Password reset request",
                text:
                    `OTP ${otp}\n` +
                    `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                    `your otp is ${otp} ` +
                    `for reset password\n\n` +
                    `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };

            // Send the email with nodemailer
            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({
                        message:
                            "Could not send email. Please try again later.",
                    });
                }
                res.status(200).json({
                    message: "Password reset email sent successfully",
                    otp: otp,
                    userId: user._id,
                });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred. Please try again later.",
        });
    }
};
exports.forgotPasswordOtp = async (req, res) => {
    try {
        const id = req.params.id;
        const otp = req.body.otp;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.otp !== otp || user.otpExpiration < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        res.status(200).json({ message: "otp verification is successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
exports.resetPassword = async (req, res) => {
    try {
        // Extract password and confirm password from request body
        const { password, confirmPassword } = req.body;

        // Verify that passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Find user with valid password reset token
        const user = await User.findOne({
            _id: req.params.id,
        });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid or expired token" });
        }

        // Update user's password and clear the reset token
        user.password = bcrypt.hashSync(password, 10);

        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred. Please try again later.",
        });
    }
};
