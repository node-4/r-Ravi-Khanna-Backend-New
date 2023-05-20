const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    transactionType: {
        type: String,
        enum: ["withdraw", "deposit"]
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", schema);
