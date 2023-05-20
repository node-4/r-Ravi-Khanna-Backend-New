const Payment = require("../models/payment.model");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const uuid = require("uuid");
const id = uuid.v4();
const Order = require("../models/order.model");

const instance = new Razorpay({
    key_id: "rzp_live_oe2m9rifPN1OM5",
    key_secret: "lVgPoYfEbRchEnFISM6yJAdr",
});

exports.create = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send({ message: "order order not found" });
        }
        const options = {
            amount: order.amount * 100,
            currency: "INR",
            receipt: id,
            partial_payment: false,
        };
        console.log(options);

        const result = await instance.orders.create(options);

        const DBData = {
            amount: result.amount,
            // orderId: result.id,
            currency: "INR",
            receipt: result.receipt,
            partial_payment: false,
            userId: req.user._id,
            order_id: result.id,
            orderId: order._id,
            status: req.body.status,
            paymentMethod: req.body.paymentMethod,
        };
        console.log(DBData);
        const payment = await Payment.create(DBData);
        order.status = true;
        await order.save();
        res.status(201).send({ msg: "payment created", data: payment });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            msg: "internal error",
            error: err.message,
        });
    }
};

exports.get = async (req, res) => {
    try {
        let q = {};
        if (req.query.userId) {
            q.userId = req.query.userId;
        }

        const payment = await Payment.find(q).populate(["userId"]);
        if (!payment) {
            return res.status(404).send({ msg: "not found" });
        }
        res.status(201).send({ data: payment });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "internal error", error: err.message });
    }
};

exports.getId = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate(["userId"]);
        if (!payment) {
            return res.status(404).send({ msg: "not found" });
        }
        res.status(201).send({ data: payment });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "internal error", error: err.message });
    }
};
