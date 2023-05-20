const mongoose = require('mongoose');

const horoscopeSchema = new mongoose.Schema({
    sign: { type: String },
    prediction: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Horoscope', horoscopeSchema);
