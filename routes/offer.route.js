const offerController = require("../controllers/offer.controller");
const { authJwt, objectId } = require("../middlewares");
var multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

module.exports = (app) => {
    app.get("/api/v1/admin/offer/:id", offerController.getId);
    app.post("/api/v1/admin/offer", offerController.getAll);
    app.post("/api/v1/admin/create",upload.single("image"),[authJwt.isAdmin],offerController.create);
    app.patch("/api/v1/admin/offer/:id",[authJwt.isAdmin, objectId.validId],offerController.update);
    app.delete("/api/v1/admin/offer/:id",[authJwt.isAdmin, objectId.validId],offerController.delete);

};
