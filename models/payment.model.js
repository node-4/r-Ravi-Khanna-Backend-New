const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
        },
        orderId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Order",
        },
        paymentStatus: {
            type: String,
            enum: ["success", "pending", "failed"],
        },
        amount: {
            type: Number,
        },
        order_id: {
            type: String,
        },
        receipt: {
            type: String,
        },
        status: {
            type: String,
        },
        paymentMethod: {
            type: String,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Payment", schema);
