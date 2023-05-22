const coupon = require("../models/coupon.model");
exports.createCoupon = async (req, res) => {
    try {
        if (!req.body.discount) {
            return res.status(400).send("please enter discount");
        }
        if (!req.body.couponCode) {
            return res.status(400).send("please enter couponCode");
        }
        if (!req.body.activationDate) {
            return res.status(400).send("please enter activationDate");
        }
        if (!req.body.expiryDate) {
            return res.status(400).send("please enter expiryDate");
        }
        const couponCreated = await coupon.create(req.body);
        console.log(`#### Coupon add successfully #### /n ${couponCreated} `);
        res.status(201).send({
            message: "Coupon add successfully",
            data: couponCreated,
        });
    } catch (err) {
        console.log("#### error while Coupon create #### ", err.message);
        res.status(500).send({
            message: "Internal server error while creating coupon",
        });
    }
};
exports.get = async (req, res) => {
    try {
        const data = await coupon.find();
        if (!data || data.length === 0) {
            return res.status(400).send({ msg: "not found" });
        }
        res.status(200).send({ data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            msg: "internal server error ",
            error: err.message,
        });
    }
};
exports.getId = async (req, res) => {
    try {
        const data = await coupon.findById(req.params.id);
        if (!data || data.length === 0) {
            return res.status(400).send({ msg: "not found" });
        }
        res.status(200).send({ data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            msg: "internal server error ",
            error: err.message,
        });
    }
};
exports.update = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await coupon.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!data) {
            return res.status(400).send({ msg: "not found" });
        }
        res.status(200).send({ msg: "updated", data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            msg: "internal server error ",
            error: err.message,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await coupon.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(400).send({ msg: "not found" });
        }
        res.status(200).send({ msg: "deleted", data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            msg: "internal server error",
            error: err.message,
        });
    }
};
