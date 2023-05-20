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