const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    predict: {
        type: String,

    },
    quizzes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Quiz",
    },

}, { timestamps: true });

module.exports = mongoose.model("Predict", schema);
