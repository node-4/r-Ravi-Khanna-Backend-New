const Category = require("../models/category.model");
const product = require("../models/product.model");
exports.createProduct = async (req, res) => {
    try {
        const data = await Category.findById(req.body.categoryId);
        if (!data || data.length === 0) {
            return res.status(400).send({ msg: "not found" });
        }
        // let productImages = [];
        // if (req.files) {
        //     for (let i = 0; i < req.files.length; i++) {
        //         let image = req.files[i].filename;
        //         productImages.push(image);
        //     }
        // }
        req.body.userId = req.user._id;
        req.body.categoryId = data._id;
        console.log(req.body);
        const productCreated = await product.create(req.body);
        console.log(`#### Product add successfully #### /n ${productCreated} `);
        res.status(201).send({
            message: "Product add successfully",
            data: productCreated,
        });
    } catch (err) {
        console.log("#### error while product create #### ", err.message);
        res.status(500).send({
            message: "Internal server error while creating product",
        });
    }
};
exports.get = async (req, res) => {
    try {
        const data = await product.find().populate("categoryId userId");
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
        const data = await product.findById(req.params.id);
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
        let saveProduct = await product.findById(req.params.id);
        if (!saveProduct) {
            return next(new ErrorHander("Product not found", 404));
        }
        let findProduct = await product.findByIdAndUpdate(
            saveProduct._id,
            {
                categoryId: req.body.categoryId || product.categoryId,
                productImages: req.body.productImages|| product.productImages,
                productName: req.body.productName || product.productName,
                description: req.body.description || product.description,
                price: req.body.price || product.price,
                discount: req.body.discount|| product.discount,
                stock: req.body.stock|| product.stock,
            },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );
        res.status(200).send({ msg: "updated", data: findProduct });
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
        const data = await product.findByIdAndDelete(req.params.id);
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
