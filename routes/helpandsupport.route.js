const express = require('express');
const help = require('../controllers/helpandsupport');
const { authJwt } = require("../middlewares");
module.exports = (app) => {
app.post('/api/v1/help/createQuery', [authJwt.verifyToken], help.AddQuery);
app.get('/api/v1/help', help.getAllHelpandSupport);
app.get('/api/v1/admin/help', help.getAllHelpandSupportgetByuserId);
app.delete('/delete/:id', help.DeleteHelpandSupport);
};