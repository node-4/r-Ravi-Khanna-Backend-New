const express = require('express');
const router = express.Router();
const kundliController = require('../controllers/kundali');
const { authJwt, objectId } = require('../middlewares');

// create a new kundli
router.post('/kundli', [authJwt.verifyToken], kundliController.create);

// get all kundlis
router.get('/kundli', kundliController.findAll);

// get a single kundli by id
router.get('/kundli/:id', [objectId.validId], kundliController.findOne);

// update a kundli by id
router.put('/kundli/:id', [authJwt.verifyToken, objectId.validId], kundliController.update);

// delete a kundli by id
router.delete('/kundli/:id', [authJwt.verifyToken, objectId.validId], kundliController.delete);

router.get('/admin/kundli', kundliController.findAll);

// get a single kundli by id
router.get('/admin/kundli/:id', [objectId.validId], kundliController.findOne);


module.exports = router;
