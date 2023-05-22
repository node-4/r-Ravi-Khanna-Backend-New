const horoscopeController = require('../controllers/horoscope.controller');
const { authJwt, objectId } = require('../middlewares');
module.exports = (app) => {
    app.post('/api/v1/createHoroscopes', horoscopeController.createHoroscope);
    app.post('/api/v1/admin/horoscopes', authJwt.isAdmin, horoscopeController.getHoroscopes);
    app.get('/api/v1/admin/horoscopes/:id', [authJwt.isAdmin, objectId.validId], horoscopeController.getHoroscopeById);
    app.put('/api/v1/admin/horoscopes/:id', [authJwt.isAdmin, objectId.validId], horoscopeController.updateHoroscopeById);
    app.delete('/api/v1/admin/horoscopes/:id', [authJwt.isAdmin, objectId.validId], horoscopeController.deleteHoroscopeById);
    app.get('/api/v1/horoscopes', horoscopeController.getHoroscopes);
    app.get('/api/v1/horoscopes/:id', [objectId.validId], horoscopeController.getHoroscopeById);
    
};
