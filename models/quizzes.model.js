const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    question: {
        type: String,
    },
    options: [
        {
            image: {
                type: String,
            },
            option: {
                type: String,
            },
        }
    ],
    answer: {
        image: {
            type: String,
        },
        option: {
            type: String,
        },
    },
    predictId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Predict',
    },
    particpatedAnswers: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Predict',
    },
    reward: {
        type: Number,
        defult: 10
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Quiz', schema);