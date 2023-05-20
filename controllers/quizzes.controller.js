const Quiz = require('../models/quizzes.model');
const Predict = require('../models/predict.model');
// GET all quizzes
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        if (quizzes.length === 0) {
            return res.status(404).send({ message: 'quizzes not Found' });
        }
        res.status(200).send({ data: quizzes });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "internal server error " + err.message });

    }
};

// GET a single quiz by ID
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).send({ message: "quiz not found" });

        }
        res.status(200).send({ data: quiz });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "internal server error " + err.message });

    }
};

// CREATE a new quiz
const createQuiz = async (req, res) => {
    try {
        const data = {
            question: req.body.question,
            answer: req.body.answer,
            options: req.body.options,
            predictId: req.body.predictId,
            reward: req.body.reward

        }
        const predict = await Predict.findById(req.body.predictId);
        if (!predict) {
            return res.status(404).send({ message: "predict not found" });
        }
        const newQuiz = await Quiz.create(data);
        predict.quizzes.push(newQuiz._id);
        const result = await predict.save();
        console.log(result);
        res.status(201).send({ message: " quiz added ", data: newQuiz });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "internal server error" });
    }
};

const updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            const error = new Error('Quiz not found');
            error.status = 404;
            throw error;
        }

        // Update the question field, if present
        if (req.body.question) {
            quiz.question = req.body.question;
        }

        // Update the answer field, if present
        if (req.body.answer) {
            quiz.answer = req.body.answer;
        }

        // Update the options field, if present
        if (req.body.options) {
            // Check if the options array should be updated in its entirety
            if (Array.isArray(req.body.options)) {
                quiz.options = req.body.options;
            } else {
                // Find the index of the option to update
                const optionIndex = quiz.options.findIndex(
                    option => option._id.toString() === req.body.options._id
                );
                if (optionIndex === -1) {
                    return res.status(404).send({ message: "option not found" });

                }
                // Update the option with the new values
                const updatedOption = req.body.options;
                quiz.options[optionIndex] = {
                    ...quiz.options[optionIndex],
                    ...updatedOption
                };
            }
        }

        const updatedQuiz = await quiz.save();

        res.status(200).send({ quiz: updatedQuiz });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "internal server error " + err.message });

    }
};
const updateQuizOption = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            const error = new Error('Quiz not found');
            error.status = 404;
            throw error;
        }

        const optionId = req.params.optionId;
        const optionIndex = quiz.options.findIndex(option => option._id.toString() === optionId);
        if (optionIndex === -1) {
            return res.status(404).send({ message: "option not found" });

        }

        const updatedOption = req.body;
        quiz.options[optionIndex] = {
            ...quiz.options[optionIndex],
            ...updatedOption
        };

        const updatedQuiz = await quiz.save();
        res.status(200).send({ message: "updated", data: updatedQuiz });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "internal server error " + err.message });

    }
};

// UPDATE an existing quiz
// const updateQuiz = async (req, res) => {
//     try {
//         const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true,
//         });
//         if (!quiz) {
//             const error = new Error('Quiz not found');
//             error.status = 404;
//             throw error;
//         }
//         res.status(200).send({ data: quiz });
//     } catch (err) {
//       (err);
//     }
// };

// DELETE a quiz by ID
const deleteQuiz = async (req, res) => {
    try {
        // const quiz = await Predict.findByIdAndUpdate("63f89ef99535a870e5651825", {
        //     $pull: {
        //         quizzes: {
        //             $in: [
        //                 "63f8a30def52c6210fcef9cd",
        //                 "63f8a35c9ed19182024f9242",
        //                 "63f8a5ff703f7a0ad72a35a6",
        //                 "63f8a768414be17e1ab18662"
        //             ]
        //         }
        //     }
        // }, { new: true });

        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        await Predict.findByIdAndUpdate(quiz.predictId, { $pull: { quizzes: quiz._id } }, { new: true });

        if (!quiz) {
            return res.status(404).send({ message: "quiz not found" });

        }
        res.status(200).send({ message: 'Quiz deleted', data: quiz });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "internal server error " + err.message });

    }
};
// const submitQuiz = async (req, res) => {
//     try {
//         const quiz = await Quiz.findById(req.params.id);
//         if (!quiz) {
//             const error = new Error('Quiz not found');
//             error.status = 404;
//             throw error;
//         }
//         const result = await quiz.submit(req.body);
//         res.status(200).send({ data: result });
//     }
// }

const checkQuizAnswers = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            res.status(404).send({ message: "quiz not found" });

        }

        const userAnswers = req.body.answer;
        // if (!Array.isArray(userAnswers)) {
        //     const error = new Error('Answers should be an array');
        //     error.status = 400;
        //     throw error;
        // }
        console.log(userAnswers);
        let score = 0;
        console.log(quiz.answer.option === userAnswers.option);

        if (quiz.answer.option && userAnswers.option.image) {
            if (quiz.answer.option === userAnswers.option && quiz.answer.image == userAnswers.image) {
                score++;
                console.log(score);
            }
        }
        else if (quiz.answer.option) {
            if (quiz.answer.option === userAnswers.option) {
                score++;
                console.log(score);
            }
        } else if (quiz.answer.image) {
            if (quiz.answer.image == userAnswers.image) {
                score++;
                console.log(score);
            }

        }
        else {

            return res.status(404).send({ message: "prediction is wrong" });
        }





        console.log(req.user);
        if (score > 0) {
            req.user.wallet += 25;
        }
        const user = await req.user.save();
        console.log(user);
        res.status(200).send({ data: score });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "internal server error " + err.message });
    }
};

module.exports = {
    getAllQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    updateQuizOption,
    checkQuizAnswers
};
