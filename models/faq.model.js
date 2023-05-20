const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        question: {
            type: String,
        },
        answer: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("FAQ", schema);
