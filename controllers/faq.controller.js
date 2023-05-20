const FAQ = require("../models/FAQ.model");

exports.create = async (req, res) => {
    try {
        if (!req.body.question) {
            return res.status(400).send("please enter question");
        }
        if (!req.body.answer) {
            return res.status(400).send("please enter answer");
        }
        const result = await FAQ.create({
            question: req.body.question,
            answer: req.body.answer,
        });
        res.status(200).send({ msg: "FAQ added", data: result });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "internal server error ", error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!data) {
            return res.status(400).send({ msg: "not found" });
        }
        res.status(200).send({ msg: "updated", data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "internal server error ", error: err.message });
    }
};

exports.get = async (req, res) => {
    try {
        const data = await FAQ.find();
        if (!data || data.length === 0) {
            return res.status(400).send({ msg: "not found" });
        }
        res.status(200).send({ data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "internal server error ", error: err.message });
    }
};

exports.getId = async (req, res) => {
    try {
        const data = await FAQ.findById(req.params.id);
        if (!data || data.length === 0) {
            return res.status(400).send({ msg: "not found" });
        }
        res.status(200).send({ data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "internal server error ", error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await FAQ.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(400).send({ msg: "not found" });
        }
        res.status(200).send({ msg: "deleted", data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "internal server error", error: err.message });
    }
};
