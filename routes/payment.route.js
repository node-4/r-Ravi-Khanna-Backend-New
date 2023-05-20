const payment = require("../controllers/payment.controller");
const { objectId, authJwt } = require("../middlewares");

module.exports = (app) => {
    app.post(
        "/api/v1/order/:id/payments",
        [authJwt.verifyToken, objectId.validId],
        payment.create
    );
    app.get("/api/v1/payments", [authJwt.verifyToken], payment.get);
    app.get(
        "/api/v1/payments/:id",
        [authJwt.verifyToken, objectId.validId],
        payment.getId
    );
    app.get("/api/v1/admin/payments", [authJwt.verifyToken], payment.get);
    app.get(
        "/api/v1/admin/payments/:id",
        [authJwt.verifyToken, objectId.validId],
        payment.getId
    );
};
