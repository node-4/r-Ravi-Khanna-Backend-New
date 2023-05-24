const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
var newOTP = require("otp-generators");
const jwt = require("jsonwebtoken");
const authconfig = require("../configs/auth.config");
const authConfig = require("../configs/auth.config");

exports.signup = async (req, res) => {
    try {
        const data = {
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
            const userObj = {};
            userObj.phone = phone;
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
        const accessToken = jwt.sign({ id: user.phone }, authConfig.secret, {
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
        const otp =  newOTP.generate(4, {
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
        const accessToken = jwt.sign({ id: user.email }, authConfig.secret, {
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
        const data = { email: req.body.email };
        const user = await User.findOne({ email: data.email });
        console.log(user);
        if (!user) {
            const user = await User.create(data);
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
