const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email: {
        type: String,
        minLength: 10
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model("Admin", schema);
