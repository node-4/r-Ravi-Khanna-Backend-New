const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
exports.update = async (req, res) => {
    try {
        const { name, email, phone, password, coin } = req.body;
        // console.log({ name, email, phone, password });
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "not found" });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.image = req.body.image || user.image;
        if (req.body.coin) {
            user.wallet.coin += coin;
        }

        if (req.body.password) {
            user.password = bcrypt.hashSync(password, 8) || user.password;

        }
        const updated = await user.save();
        // console.log(updated);
        res.status(200).send({ message: "updated", data: updated })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "internal server error " + err.message })
    }
}

exports.getAll = async (req, res) => {
    try {
        const users = await User.find().lean().select({ _id: 1, name: 1, email: 1, phone: 1, wallet: 1, referalcode: 1 });
        if (users.length === 0) {
            return res.status(200).send({ message: "no users found" });
        }
        res.status(200).send({ data: users });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "internal server error " + err.message });
    }
}
exports.get = async (req, res) => {
    try {
        const users = await User.findById(req.params.id).lean().select({ _id: 1, name: 1, email: 1, phone: 1, wallet: 1, referalcode: 1 });
        if (!users || users.length === 0) {
            return res.status(404).send({ message: "user not found" });
        }
        res.status(200).send({ data: users });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "internal server error " + err.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).hint({ email: 1, phone: 1 });
        if (!user) {
            return res.status(404).send({ message: "delete failed ! user not found" });
        }
        res.status(200).send({ message: "deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "internal server error " + err.message });
    }
}
