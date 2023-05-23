const authController = require("../controllers/admin.controller");
const { objectId, authJwt, validateAdmin } = require("../middlewares");

module.exports = (app) => {
    app.post(
        "/api/v1/admin/auth/signup",
        // [validateAdmin.user],
        authController.signUp
    );
    app.post(
        "/api/v1/admin/auth/signin",
        // [validateBodies.signInBody],
        authController.signIn
    );

    app.get("/api/v1/admin", [authJwt.isAdmin], authController.getAdmins);
    app.put(
        "/api/v1/admin/:id",
        [authJwt.isAdmin, objectId.validId],
        authController.updateAdmin
    );
    app.delete(
        "/api/v1/admin/:id",
        [authJwt.isAdmin, objectId.validId],
        authController.deleteAdmin
    );
    app.get(
        "/api/v1/admin/:id",
        [authJwt.isAdmin, objectId.validId],
        authController.get
    );
    app.post("/api/v1/admin/auth/createUser",[authJwt.isAdmin],authController.createUser);
};
