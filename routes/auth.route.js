const { validateUser } = require("../middlewares");
const auth = require("../controllers/auth.controller");

module.exports = (app) => {
    app.post("/api/v1/auth/signup", [validateUser.userFields], auth.signup);
    app.post("/api/v1/auth/login", auth.loginWithPhone);
    app.post("/api/v1/auth/signin", [validateUser.signInBody], auth.signin);
    app.post("/api/v1/auth/login/:id/verify", auth.verifyOtp);
    app.get("/api/v1/resendotp/:id", auth.resendOTP);

}