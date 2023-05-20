const mongoose = require('mongoose');

// Define the schema for a comment
const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    name: { type: String, required: true },

    comment: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    createdAt: { type: Date, default: Date.now },
});

// Define the model for a comment
module.exports = mongoose.model('Comment', commentSchema);