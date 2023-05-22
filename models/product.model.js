const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },
        categoryId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "category",
            required: true,
        },
        productImages: {
            type: Array,
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: String,
            required: true,
        },
    },
    { timeseries: true }
);
module.exports = mongoose.model("product", schema);
