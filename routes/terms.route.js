const express = require('express');
const router = express.Router();
const termsController = require('../controllers/terms.controller');
const { authJwt, objectId } = require('../middlewares');

// GET all terms and conditions
router.post('/admin/terms/All', termsController.getAllTerms);

// GET a single term and condition by ID
router.get('/admin/terms/:id', [objectId.validId], termsController.getTermById);

// CREATE a new term and condition
router.post('/admin/terms', [authJwt.isAdmin], termsController.createTerm);

// UPDATE a term and condition by ID
router.put('/admin/terms/:id', [authJwt.isAdmin, objectId.validId], termsController.updateTerm);

// DELETE a term and condition by ID
router.delete('/admin/terms/:id', [authJwt.isAdmin, objectId.validId], termsController.deleteTerm);

// users
router.get('/terms', termsController.getAllTerms);

// GET a single term and condition by ID
router.get('/terms/:id', termsController.getTermById);

module.exports = router;
