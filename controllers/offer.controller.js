const Offer = require("../models/offer.model");
exports.create = async (req, res) => {
    try {
        const offer = {
            title: req.body.title,
            description: req.body.description,
            amount: req.body.amount,
            image: req.body.image,
        };
        const offerCreated = await Offer.create(offer);
        console.log(
            `#### Offer add successfully #### /n ${offerCreated} `
        );
        res.status(201).send({
            message: "Offer add successfully",
            data: offerCreated,
        });
    } catch (err) {
        console.log("#### error while Offer create #### ", err.message);
        res.status(500).send({
            message: "Internal server error while creating offer",
        });
    }
};
exports.getAll = async (req, res) => {
    try {
        const data = await Offer.find();
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
        const data = await Offer.findById(req.params.id);
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
        const data = await Offer.findByIdAndUpdate(req.params.id, req.body, {
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
        const data = await Offer.findByIdAndDelete(req.params.id);
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
