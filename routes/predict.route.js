const predicts = require("../controllers/predict.controller");
const { authJwt, objectId } = require("../middlewares");

module.exports = (app) => {
    app.post("/api/v1/admin/predicts", [authJwt.isAdmin], predicts.createPrediction);
    app.put("/api/v1/admin/predicts/:id", [authJwt.isAdmin, objectId.validId], predicts.updatePredictionById);
    app.get("/api/v1/admin/predicts", predicts.getAllPredictions);
    app.get("/api/v1/admin/predicts/:id", [objectId.validId], predicts.getPredictionById);
    app.delete("/api/v1/admin/predicts/:id", [authJwt.isAdmin, objectId.validId], predicts.deletePredictionById);

    // predicts
    app.put("/api/v1/predicts/:id", [authJwt.verifyToken, objectId.validId], predicts.updatePredictionById);
    app.get("/api/v1/predicts", predicts.getAllPredictions);
    app.get("/api/v1/predicts/:id", [objectId.validId], predicts.getPredictionById);
}