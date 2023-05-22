const productController = require("../controllers/product.controller");
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
    app.get("/api/v1/admin/product/:id", productController.getId);
    app.post("/api/v1/admin/product", productController.get);
    app.post("/api/v1/admin/createProduct",upload.array("image"),[authJwt.isAdmin],productController.createProduct);
    app.patch("/api/v1/admin/product/:id",upload.array("image"),[authJwt.isAdmin, objectId.validId],productController.update);
    app.delete("/api/v1/admin/product/:id",[authJwt.isAdmin, objectId.validId],productController.delete);
};
