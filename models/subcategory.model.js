const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Admin",
        },
        categoryId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "category",
        },
        name: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    { timeseries: true }
);
module.exports = mongoose.model("subcategory", schema);
