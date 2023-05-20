
const notificationsController = require('../controllers/notification.controller');
const { authJwt, objectId } = require('../middlewares');

// GET all notifications and conditions
module.exports = (app) => {
    app.get('/api/v1/admin/notifications', notificationsController.getAllNotifications);

    // GET a single term and condition by ID
    app.get('/api/v1/admin/notifications/:id',  notificationsController.getById);

    // CREATE a new term and condition
    app.post('/api/v1/admin/notifications', [authJwt.isAdmin], notificationsController.createNotification);

    // UPDATE a term and condition by ID
    app.put('/api/v1/admin/notifications/:id', [authJwt.isAdmin, objectId.validId], notificationsController.updateNotification);

    // DELETE a term and condition by ID
    app.delete('/api/v1/admin/notifications/:id', [authJwt.isAdmin, objectId.validId], notificationsController.deleteNotification);

    // users
    app.get('/api/v1/notifications', notificationsController.getAllNotifications);

    // GET a single term and condition by ID
    app.get('/api/v1/notifications/:id', notificationsController.getById);
}

