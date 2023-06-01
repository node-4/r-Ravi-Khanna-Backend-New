const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        refferalUser: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        }],
        name: {
            type: String,
        },
        email: {
            type: String,
            minLength: 10,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
        },
        otp: {
            type: String,
        },
        otpExpiration: {
            type: Date,
        },
        wallet: {
            coin: {
                type: Number,
                default: 0,
            },
            cash: {
                type: Number,
                default: 0,
            },
        },
        referalcode: {
            type: String,
        },
        kyc: {
            type: String,
        },
        role: {
            type: String,
        },
        image: {
            type: String,
        },
        newuser: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", schema);
