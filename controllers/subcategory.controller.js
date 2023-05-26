const Category = require("../models/category.model");
const subCategory = require("../models/subcategory.model");
exports.createSubCategory = async (req, res) => {
    try {
        const data = await Category.findById(req.body.categoryId);
        if (!data || data.length === 0) {
            return res.status(400).send({ msg: "not found" });
        }
        let image;
        if (req.file) {
            image = req.file.filename;
        }
        const subcategory = {
            userId: req.user._id,
            name: req.body.name,
            image: image,
            categoryId: data._id,
        };
        const subcategoryCreated = await subCategory.create(subcategory);
        console.log(
            `#### Sub Category add successfully #### /n ${subcategoryCreated} `
        );
        res.status(201).send({
            message: "Sub Category add successfully",
            data: subcategoryCreated,
        });
    } catch (err) {
        console.log("#### error while sub Category create #### ", err.message);
        res.status(500).send({
            message: "Internal server error while creating sub category",
        });
    }
};
exports.get = async (req, res) => {
    try {
        const data = await subCategory.find().populate('categoryId userId');
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
        const data = await subCategory.findById(req.params.id);
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
        const findCategory = await Category.findById(req.body.categoryId);
        if (!findCategory || findCategory.length === 0) {
            return res.status(400).send({ msg: "not found" });
        }
        if (req.file) {
            req.body.image = req.file.filename;
        }
        const data = await subCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
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
        const data = await subCategory.findByIdAndDelete(req.params.id);
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
