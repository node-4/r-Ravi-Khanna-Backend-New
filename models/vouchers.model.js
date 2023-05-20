const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    voucherImage: {
        type: String,

    },
    voucherCode: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Voucher", schema);