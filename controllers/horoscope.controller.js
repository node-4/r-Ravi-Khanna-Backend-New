const Horoscope = require("../models/horoscope.model"); // Create a horoscope
exports.createHoroscope = async (req, res) => {
    try {
        if (!req.body.horoscope) {
            return res.status(400).json({ message: "Horoscope is required" });
        }
        if (!req.body.professional) {
            return res
                .status(400)
                .json({ message: "Professional is required" });
        }
        const horoscopeObj = {
            horoscope: req.body.horoscope,
            professional: req.body.professional,
            emotions: req.body.emotions,
            health: req.body.health,
            travel: req.body.travel,
            luck: req.body.luck,
            duration: req.body.duration,
            rashi: req.body.rashi,
            date: new Date(),
        };
        const horoscopeCreated = await Horoscope.create(horoscopeObj);
        res.status(200).send({
            message: "horoscope add successfully",
            data: horoscopeCreated,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.getHoroscopes = async (req, res) => {
    try {
        const horoscopes = await Horoscope.find();
        if (horoscopes.length === 0) {
            // throw createError(404, 'Horoscope not found');
            return res.status(404).json({ message: "Horoscopes not found" });
        }
        res.status(200).send({
            message: "Horoscope data found successfully",
            data: horoscopes,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.getHoroscopeById = async (req, res) => {
    try {
        const horoscope = await Horoscope.findById(req.params.id);
        if (!horoscope) {
            return res.status(404).json({ message: "Horoscope not found" });
        }
        res.status(200).send({
            message: "Horoscope data found successfully",
            data: horoscope,
        });    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.updateHoroscopeById = async (req, res) => {
    try {
        const horoscope = await Horoscope.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!horoscope) {
            return res.status(404).json({ message: "Horoscope not found" });
        }
        res.status(200).json(horoscope);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.deleteHoroscopeById = async (req, res) => {
    try {
        const horoscope = await Horoscope.findByIdAndDelete(req.params.id);
        if (!horoscope) {
            return res.status(404).json({ message: "Horoscope not found" });
        }
        res.status(200).json({ message: "horoscope deleted", data: horoscope });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
