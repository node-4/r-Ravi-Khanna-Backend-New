const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        // required: true,
    },

    // email: {
    //     type: String,
    //     required: true,
    // },
    rating: {
        type: Number,
        // required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        // required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);


