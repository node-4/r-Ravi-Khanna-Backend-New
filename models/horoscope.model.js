const mongoose = require("mongoose");

const horoscopeSchema = new mongoose.Schema({
    horoscope: {
        type: String,
    },
    professional: {
        type: String,
    },
    emotions: {
        type: String,
    },
    health: {
        type: String,
    },
    travel: {
        type: String,
    },
    luck: {
        type: String,
    },
    duration: {
        type: String,
    },
    rashi: {
        type: String,
    },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Horoscope", horoscopeSchema);
