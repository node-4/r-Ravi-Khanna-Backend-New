const Submission = require('../models/submission.model');
const createError = require('http-errors');
const Quiz = require('../models/quizzes.model');
const User = require('../models/user.model');
const res = require('express/lib/response');

exports.submitAnswer = async (req, res, next) => {
    try {
        if (!req.body.answer) {
            return next(createError.BadRequest("answer is required"))
        }
        const subObj = {
            name: req.user.name,
            quizId: req.params.id,
            userId: req.user._id,
            answer: req.body.answer
        }

        const quiz = await Quiz.findById(subObj.quizId);
        console.log(quiz);
        if (!quiz) { return next(createError.NotFound("not found")) }

        const result = await Submission.create(subObj);
        res.status(201).send({ data: result })
    }
    catch (error) {
        console.log(error);
        next(createError.InternalServerError("Server error " + error.message));
    }
}

exports.get = async (req, res, next) => {
    try {
        const result = await Submission.findById(req.params.id);
        if (!result) { return next(createError.NotFound("not foound")) }
        res.status(200).send({ data: result })

    } catch (error) {
        console.log(error);
        next(createError.InternalServerError("Server error " + error.message));
    }
}

exports.getAll = async (req, res) => {
    try {
        let queryObj = {};
        if (req.query.userId) {
            queryObj.userId = req.query.userId;
        }
        if (req.query.quizId) {
            queryObj.quizId = req.query.quizId;
        }
        const result = await Submission.find(queryObj);
        if (result.length === 0) { return next(createError.NotFound("not found")) }
        res.status(200).send({ data: result })

    } catch (error) {
        console.log(error);
        next(createError.InternalServerError("Server error " + error.message));
    }
}


exports.updateReward = async (req, res, next) => {
    try {
        const submissions = await Submission.find({ quizId: req.params.id });
        if (!submissions) { return next(createError.NotFound("predictions not found")) }
        // console.log(submissions);
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) { return next(createError.NotFound(" quiz not found")) }
        // console.log(quiz);
        for (const submission of submissions) {
            if (submission.answer.option == quiz.answer.option) {
                console.log(submission.answer.option, " ", quiz.answer.option)
                console.log(submission.answer.option == quiz.answer.option)
                const t = await submission.updateOne({ rewardEarned: quiz.reward }, { new: true });
                console.log(t);
                const user = await User.findById(submission.userId);
                console.log(user);
                user.wallet += quiz.reward;
                const updated = await user.save();
                console.log(updated);
            }
            console.log(submission.answer.option, " ", quiz.answer.option)
            console.log(submission.answer.option == quiz.answer.option)

        }
        console.log("----------------------------------------------------------------/n ", req.user);

        res.status(200).send({ message: "reward added to user based on prediction" })
    } catch (error) {
        console.log(error);
        next(createError.InternalServerError("Server error " + error.message));
    }
}

