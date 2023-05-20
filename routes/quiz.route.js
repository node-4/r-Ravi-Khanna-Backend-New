const quizzes = require("../controllers/quizzes.controller");
const { authJwt, objectId } = require("../middlewares");

module.exports = (app) => {
    app.post("/api/v1/admin/quizzes", [authJwt.isAdmin], quizzes.createQuiz);
    app.put("/api/v1/admin/quizzes/:id", [authJwt.isAdmin, objectId.validId], quizzes.updateQuiz);
    app.get("/api/v1/admin/quizzes", quizzes.getAllQuizzes);
    app.get("/api/v1/admin/quizzes/:id", [objectId.validId], quizzes.getQuizById);
    app.put("/api/v1/admin/quizzes/:id/option/:optionId", [authJwt.isAdmin, objectId.validId], quizzes.updateQuizOption);
    app.delete("/api/v1/admin/quizzes/:id", [authJwt.isAdmin, objectId.validId], quizzes.deleteQuiz);

    // quizzes
    app.put("/api/v1/quizzes/:id", [authJwt.verifyToken, objectId.validId], quizzes.updateQuiz);
    app.get("/api/v1/quizzes", quizzes.getAllQuizzes);
    app.get("/api/v1/quizzes/:id", [objectId.validId], quizzes.getQuizById);
    app.post("/api/v1/quizzes/:id/submit", [authJwt.verifyToken, objectId.validId], quizzes.checkQuizAnswers);
}