const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    title: {
        type: String,
        // enum: ['info', 'warning', 'error'],

    },
    isRead: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);