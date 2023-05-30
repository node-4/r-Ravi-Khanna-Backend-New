const express = require('express');
const help = require('../controllers/helpandsupport');
const { authJwt } = require("../middlewares");
const router = express();
router.post('/api/v1/help/createQuery', [authJwt.verifyToken], help.AddQuery);
router.get('/api/v1/help', help.getAllHelpandSupport);
router.get('/api/v1/admin/help', help.getAllHelpandSupportgetByuserId);
router.delete('/delete/:id', help.DeleteHelpandSupport);
module.exports = router;

