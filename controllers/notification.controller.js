
const Notification = require('../models/notification.model');
// CREATE Notification
exports.createNotification = async (req, res) => {
    try {



        const notification = await Notification.create({
            message: req.body.message,
            title: req.body.title,
            isRead: false
        })
        // notification.notifications.push(notification);
        // await notification.save();

        res.status(201).json(notification);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// READ All Notifications
exports.getById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        notification.read = true;
        await notification.save()
        res.status(200).json(notification);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAllNotifications = async (req, res) => {
    try {
        const notification = await Notification.find();

        if (!notification || notification.length === 0) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json(notification);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};


// UPDATE Notification
exports.updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, {
            message: req.body.message,
            title: req.body.title,

        }, { new: true });

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// DELETE Notification
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }


        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
