const { validateUser } = require("../middlewares");
const auth = require("../controllers/auth.controller");

module.exports = (app) => {
    app.post("/api/v1/auth/signup", [validateUser.userFields], auth.signup);
    app.post("/api/v1/auth/phoneSignup", auth.signupWithPhone);
    app.post("/api/v1/auth/login", auth.loginWithPhone);
    app.post("/api/v1/auth/signin", [validateUser.signInBody], auth.signin);
    app.post("/api/v1/auth/login/:id/verify", auth.verifyOtp);
    app.get("/api/v1/resendotp/:id", auth.resendOTP);
    app.post("/api/v1/auth/sociallogin", auth.socialLogin);
    app.post("/api/v1/forgotpassword", auth.forgotPassword);
    app.post("/api/v1/forgotPasswordOtp/:id", auth.forgotPasswordOtp);
    app.post("/api/v1/resetPassword/:id", auth.resetPassword);
    app.get("/api/v1/getTrackingData/:id", auth.getUser);
    app.post("/api/v1/addTrackingData", auth.addTrackingData);
}