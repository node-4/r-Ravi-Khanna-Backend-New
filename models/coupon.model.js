const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        discount: {
            type: Number,
            required: true,
        },
        couponCode: {
            type: String,
            required: true,
        },
        activationDate: {
            type: Date,
            default: Date.now,
        },
        expiryDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timeseries: true }
);
module.exports = mongoose.model("coupon", schema);
