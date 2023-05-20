const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    quizId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Quiz',
        required: true
    },
    answer: {
        type: Object,
        required: true
    },
    rewardEarned: {
        type: Number,
        defualt: 0,

    },
    prediction: {
        type: Boolean,
        default: false
    }
}, { timeseries: true });
module.exports = mongoose.model('Submission', schema);