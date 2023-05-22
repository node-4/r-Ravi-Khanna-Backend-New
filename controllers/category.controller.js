const Category = require("../models/category.model");
exports.createCategory = async (req, res) => {
    try {
        let image;
        if (req.file) {
            image = req.file.filename;
        }
        const category = {
            userId: req.user._id,
            name: req.body.name,
            image: image,
        };
        const categoryCreated = await Category.create(category);
        console.log(
            `#### Category add successfully #### /n ${categoryCreated} `
        );
        res.status(201).send({
            message: "Category add successfully",
            data: categoryCreated,
        });
    } catch (err) {
        console.log("#### error while Category create #### ", err.message);
        res.status(500).send({
            message: "Internal server error while creating category",
        });
    }
};
exports.get = async (req, res) => {
    try {
        const data = await Category.find();
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
        const data = await Category.findById(req.params.id);
        if (!data || data.length === 0) {
            return res.status(400).send({ msg: "not found" });
        }
        res.status(200).send({ data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "internal server error ", error: err.message });
    }
};
exports.update = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename;
        }
        const data = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true,});
        if (!data) {
            return res.status(400).send({ msg: "not found" });
        }
        res.status(200).send({ msg: "updated", data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "internal server error ", error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await Category.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(400).send({ msg: "not found" });
        }
        res.status(200).send({ msg: "deleted", data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "internal server error", error: err.message });
    }
};
