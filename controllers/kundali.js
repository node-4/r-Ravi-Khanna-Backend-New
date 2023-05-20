const Kundli = require('../models/kundali');

// create a new kundli
exports.create = async (req, res) => {
    try {
        const kundli = new Kundli(req.body);
        const savedKundli = await kundli.save();
        res.status(201).json(savedKundli);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// get all kundlis
exports.findAll = async (req, res) => {
    try {
        const kundlis = await Kundli.find();
        if (!kundlis || kundlis.length === 0) throw new Error('Kundli not found');
        res.json(kundlis);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// get a single kundli by id
exports.findOne = async (req, res) => {
    try {
        const kundli = await Kundli.findById(req.params.id);
        if (!kundli) throw new Error('Kundli not found');
        res.json(kundli);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// update a kundli by id
exports.update = async (req, res) => {
    try {
        const kundli = await Kundli.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!kundli) throw new Error('Kundli not found');
        res.json(kundli);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// delete a kundli by id
exports.delete = async (req, res) => {
    try {
        const kundli = await Kundli.findByIdAndDelete(req.params.id);
        if (!kundli) throw new Error('Kundli not found');
        res.json(kundli);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};
