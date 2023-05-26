const categoryController = require("../controllers/category.controller");
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
    app.get("/api/v1/admin/category/:id", categoryController.getId);
    app.post("/api/v1/admin/category", categoryController.get);
    app.post("/api/v1/admin/createCategory",[authJwt.isAdmin],categoryController.createCategory);
    app.patch(
        "/api/v1/admin/category/:id",
        [authJwt.isAdmin, objectId.validId],
        categoryController.update
    );
    app.delete(
        "/api/v1/admin/category/:id",
        [authJwt.isAdmin, objectId.validId],
        categoryController.delete
    );

};
