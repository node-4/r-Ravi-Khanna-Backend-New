const Predict = require("../models/predict.model");

// Create a new prediction
const createPrediction = async (req, res) => {
    try {
        const newPrediction = await Predict.create(req.body);
        res.status(201).send({ success: true, data: newPrediction });
    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false, message: err.message });
    }
};

// Get all predictions
const getAllPredictions = async (req, res) => {
    try {
        const predictions = await Predict.find();
        if (predictions.length === 0) {
            return res.status(404).send({ success: false, message: "No predictions found" });
        }
        res.status(200).send({ success: true, data: predictions });
    } catch (err) {

        console.log(err);
        res.status(400).send({ success: false, message: err.message });
    }
};

// Get a prediction by ID
const getPredictionById = async (req, res) => {
    try {
        const prediction = await Predict.findById(req.params.id).populate("quizzes");
        if (!prediction) {
            return res.status(404).send({ success: false, message: "Prediction not found" });
        }
        res.status(200).send({ success: true, data: prediction });
    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false, message: err.message });
    }
};

// Update a prediction by ID
const updatePredictionById = async (req, res) => {
    try {
        const updatedPrediction = await Predict.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPrediction) {
            return res.status(404).send({ success: false, message: "Prediction not found" });
        }
        res.status(200).send({ success: true, data: updatedPrediction });
    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false, message: err.message });
    }
};

// Delete a prediction by ID
const deletePredictionById = async (req, res) => {
    try {
        const deletedPrediction = await Predict.findByIdAndDelete(req.params.id);
        if (!deletedPrediction) {
            return res.status(404).send({ success: false, message: "Prediction not found" });
        }
        res.status(200).send({ success: true, data: deletedPrediction });
    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false, message: err.message });
    }
};

module.exports = {
    createPrediction,
    getAllPredictions,
    getPredictionById,
    updatePredictionById,
    deletePredictionById,
};
