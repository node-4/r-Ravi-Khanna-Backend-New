const user = require("../controllers/user.controller");
const { authJwt, objectId } = require("../middlewares");

module.exports = (app) => {
    app.put("/api/v1/admin/users/:id", [authJwt.isAdmin, objectId.validId], user.update);
    app.get("/api/v1/admin/users", [authJwt.isAdmin], user.getAll);
    app.get("/api/v1/admin/users/:id", [authJwt.isAdmin, objectId.validId], user.get);
    app.delete("/api/v1/admin/users/:id", [authJwt.isAdmin, objectId.validId], user.delete);

    // users
    app.put("/api/v1/users/:id", [authJwt.verifyToken, objectId.validId], user.update);
    app.get("/api/v1/users", [authJwt.verifyToken], user.getAll);
    app.get("/api/v1/users/:id", [authJwt.verifyToken, objectId.validId], user.get);
}