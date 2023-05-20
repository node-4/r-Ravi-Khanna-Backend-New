const { body, validationResult } = require('express-validator');

exports.validateFeedback = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 50 }).withMessage('Name should not be more than 50 characters'),

    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isInt({ min: 1, max: 5 }).withMessage('Rating should be between 1 and 5'),
    body('comment')
        .isLength({ max: 200 }).withMessage('Comment should not be more than 200 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const Feedback = require('../models/feedback.model');

// GET all feedback
exports.getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        if (feedbacks.length === 0) {
            return res.status(404).json({ message: 'No feedback found' });
        }
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET a single feedback
exports.getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.feedbackId);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE a new feedback
exports.createFeedback = async (req, res) => {
    const feedback = new Feedback({
        userId: req.user._id,
        name: req.body.name,
        // email: req.body.email,
        rating: req.body.rating,
        comment: req.body.comment,
    });

    try {
        const newFeedback = await feedback.save();
        res.status(201).json(newFeedback);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE an existing feedback
exports.updateFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        feedback.name = req.body.name || feedback.name;
        // feedback.email = req.body.email;
        feedback.rating = req.body.rating || feedback.rating;
        feedback.comment = req.body.comment || feedback.comment;

        const updatedFeedback = await feedback.save();
        res.status(200).json(updatedFeedback);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a feedback
exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.feedbackId);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        await feedback.remove();
        res.status(200).json({ message: 'Feedback deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
