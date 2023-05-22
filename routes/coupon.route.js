const couponController = require("../controllers/coupon.controller");
const { authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
    app.get("/api/v1/admin/coupon/:id", couponController.getId);
    app.post("/api/v1/admin/coupon", couponController.get);
    app.post("/api/v1/admin/createCoupon",[authJwt.isAdmin],couponController.createCoupon);
    app.patch("/api/v1/admin/coupon/:id",[authJwt.isAdmin, objectId.validId],couponController.update);
    app.delete("/api/v1/admin/coupon/:id",[authJwt.isAdmin, objectId.validId],couponController.delete);

};
