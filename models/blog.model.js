const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        authorName: {
            type: String,
        },
        image: {
            type: String,
        },
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        tags: {
            type: [String],
        },
        views: {
            type: Number,
            default: 0,
        },
        likes: {
            type: Number,
            default: 0,
        },
        comments: [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                content: {
                    type: String,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        isPublished: {
            type: Boolean,
            default: false,
        },
        publishedDate: {
            type: Date,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Blog", schema);
