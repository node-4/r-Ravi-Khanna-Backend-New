const express = require('express');
const router = express.Router();
const horoscopeController = require('../controllers/horoscope');
const { authJwt, objectId } = require('../middlewares');

// Admin routes

// GET all horoscopes
router.get('/admin/horoscopes', authJwt.isAdmin, horoscopeController.getHoroscopes);

// GET a single horoscope by ID
router.get('/admin/horoscopes/:id', [authJwt.isAdmin, objectId.validId], horoscopeController.getHoroscopeById);

// CREATE a new horoscope
router.post('/horoscopes', horoscopeController.createHoroscope);

// UPDATE a horoscope by ID
router.put('/admin/horoscopes/:id', [authJwt.isAdmin, objectId.validId], horoscopeController.updateHoroscopeById);

// DELETE a horoscope by ID
router.delete('/admin/horoscopes/:id', [authJwt.isAdmin, objectId.validId], horoscopeController.deleteHoroscopeById);

// User routes

// GET all horoscopes
router.get('/horoscopes', horoscopeController.getHoroscopes);

// GET a single horoscope by ID
router.get('/horoscopes/:id', [objectId.validId], horoscopeController.getHoroscopeById);

module.exports = router;
