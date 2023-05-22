const subcategoryController = require("../controllers/subcategory.controller");
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
    app.get("/api/v1/admin/subcategory/:id", subcategoryController.getId);
    app.get("/api/v1/admin/subcategory", subcategoryController.get);
    app.post("/api/v1/admin/createSubcategory",upload.single("image"),[authJwt.isAdmin],subcategoryController.createSubCategory);
    app.patch("/api/v1/admin/subcategory/:id",[authJwt.isAdmin, objectId.validId],subcategoryController.update);
    app.delete(
        "/api/v1/admin/subcategory/:id",
        [authJwt.isAdmin, objectId.validId],
        subcategoryController.delete
    );

};
