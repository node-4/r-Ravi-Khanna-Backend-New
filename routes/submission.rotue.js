const submissions = require("../controllers/submission.controller");
const { authJwt, objectId } = require("../middlewares");

module.exports = (app) => {
    app.post("/api/v1/submissions/:id", [authJwt.verifyToken], submissions.submitAnswer);
    app.put("/api/v1/admin/submissions/:id", [authJwt.isAdmin, objectId.validId], submissions.updateReward);
    app.get("/api/v1/admin/submissions", submissions.getAll);
    app.get("/api/v1/admin/submissions/:id", [objectId.validId], submissions.get);
    // app.delete("/api/v1/admin/submissions/:id", [authJwt.isAdmin, objectId.validId], submissions.deletePredictionById);

    // submissions
    app.put("/api/v1/submissions/:id", [authJwt.verifyToken, objectId.validId], submissions.updateReward);
    app.get("/api/v1/submissions", submissions.getAll);
    app.get("/api/v1/submissions/:id", [objectId.validId], submissions.get);
}