const faq = require("../controllers/faq.controller");
const { authJwt, objectId } = require("../middlewares");

module.exports = (app) => {
    app.post("/api/v1/admin/faq", [authJwt.isAdmin], faq.create);
    app.patch(
        "/api/v1/admin/faq/:id",
        [authJwt.isAdmin, objectId.validId],
        faq.update
    );
    app.get("/api/v1/admin/faq/:id", faq.getId);
    app.get("/api/v1/admin/faq", faq.get);
    app.delete(
        "/api/v1/admin/faq/:id",
        [authJwt.isAdmin, objectId.validId],
        faq.delete
    );

    app.get("/api/v1/faq/:id", [objectId.validId], faq.getId);
    app.get("/api/v1/faq", faq.get);
};
