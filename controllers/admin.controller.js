const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
exports.signUp = async (req, res) => {
    try {
        console.log(req.body);
        const adminObj = {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        };
        const adminCreated = await Admin.create(adminObj);
        console.log(`#### signed  up successfully #### /n ${adminCreated} `);
        res.status(201).send({
            message: "signed up successfully",
            data: adminCreated,
        });
    } catch (err) {
        console.log("#### error while Admin sign up #### ", err.message);
        res.status(500).send({
            message: "Internal server error while creating Admin",
        });
    }
};

exports.signIn = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).send({
                message: "email is required",
            });
        }
        if (!req.body.password) {
            return res.status(400).send({
                message: "password is required",
            });
        }
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            return res.status(400).send({
                message: "Failed! AdminId passed doesn't exist",
            });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            admin.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Wrong password",
            });
        }

        const accessToken = jwt.sign({ id: admin.email }, authConfig.secret, {
            expiresIn: "24h",
        });

        console.log(`#### ${admin.email}  logged in ####`);

        res.status(200).send({
            msg: "user logged in successfully",
            accessToken: accessToken,
        });
    } catch (err) {
        console.log("#### Error while Admin signing in ##### ", err.message);
        res.status(500).send({
            message: "Internal server error while Admin signing in",
        });
    }
};

exports.refreshAccessToken = (req, res) => {
    const accessToken = jwt.sign({ id: req.Admin.AdminId }, authConfig.secret, {
        expiresIn: authConfig.accessTokenTime,
    });
    res.status(200).send({
        accessToken: accessToken,
    });
};

exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        console.log(
            `#### admin with < ${admin.email} ${admin._id}   deleted ####`
        );
        return res.status(200).json({ message: "Admin deleted" });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "server error while deleting admin",
            error: err.message,
        });
    }
};
exports.get = async (req, res) => {
    try {
        const admins = await Admin.findById(req.params.id);
        if (!admins || admins.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json(admins);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "server error while getting admins",
            error: err.message,
        });
    }
};

exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({});
        if (admins.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json(admins);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "server error while getting admins",
            error: err.message,
        });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        admin.password = req.body.password
            ? bcrypt.hashSync(req.body.password, 8)
            : admin.password;
        admin.email = req.body.email ? req.body.email : admin.email;

        const updatedAdmin = await admin.save();

        console.log(
            `#### ${updatedAdmin.email} ${updatedAdmin._id} data updated ####`
        );
        res.status(200).send({
            message: "Admin updated successfully",
            data: updatedAdmin,
        });
    } catch (err) {
        console.log("#### Error while updating admin data #### ", err.message);
        res.status(500).send({
            message: "Internal server error while updating admin data",
        });
    }
};
exports.createUser = async (req, res) => {
    try {
        if (req.body.password != req.body.confirmPassword) {
            res.status(501).send({
                message: "Password Not matched.",
                data: {},
            });
        } else {
            const data = {
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                name: req.body.name,
                phone: req.body.phone,
                role: req.body.role,
            };
            const user = await User.create(data);
            res.status(201).send({
                message: "registered successfully ",
                data: user,
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: "internal server error " + err.message });
    }
};
exports.updateProfile = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const user = await Admin.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ message: "not found" });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.image = req.body.image || user.image;
        if (req.body.password) {
            user.password = bcrypt.hashSync(password, 8) || user.password;
        }
        const updated = await user.save();
        // console.log(updated);
        res.status(200).send({ message: "updated", data: updated });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "internal server error " + err.message,
        });
    }
};
