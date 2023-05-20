const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { validateFeedback } = require('../middlewares/validate.feedback');
const { authJwt, objectId } = require('../middlewares');
const {
    createFeedback,
    getFeedbackById,
    getFeedbacks,
    updateFeedback,
    deleteFeedback
} = require('../controllers/feedback.controller');

// User can post feedback
router.post('/feedback',
    authJwt.verifyToken,
    validateFeedback,
    createFeedback
);

// User can read their own feedback
router.get('/feedback/:feedbackId',

    param('feedbackId').isMongoId().withMessage('Invalid feedback ID'),
    validateFeedback,
    getFeedbackById
);

// Admin can read all feedback
router.get('/admin/feedback',

    getFeedbacks
);
router.get('/admin/feedback/:feedbackId',

    param('feedbackId').isMongoId().withMessage('Invalid feedback ID'),
    validateFeedback,
    getFeedbackById
);
router.get('/feedback',

    getFeedbacks
);
// Admin can update feedback
router.patch('/admin/feedback/:id',
    [
        authJwt.isAdmin,
        objectId.validId

    ],
    updateFeedback
);

// Admin can delete feedback
router.delete('/admin/feedback/:feedbackId',
    authJwt.isAdmin,
    param('feedbackId').isMongoId().withMessage('Invalid feedback ID'),
    deleteFeedback
);

module.exports = router;
