const Voucher = require('../models/vouchers.model');
const createError = require("http-errors");
// GET all vouchers
const getAllVouchers = async (req, res, next) => {
    try {
        const vouchers = await Voucher.find().lean();
        if (vouchers.lenth === 0) {
            return res.status(404).json({ message: 'No vouchers found' });
        }
        res.send({ data: vouchers });
    } catch (error) {
        next(createError(500, "internal server error: " + error.message));
    }
};

// GET a single voucher by ID
const getVoucherById = async (req, res, next) => {
    try {
        const voucher = await Voucher.findById(req.params.id).lean();
        if (!voucher) {
            return res.status(404).json({ message: 'Voucher not found' });
        }
        res.send({ data: voucher });
    } catch (error) {
        next(createError(500, "internal server error: " + error.message));

    }
};

// CREATE a new voucher
const createVoucher = async (req, res, next) => {
    try {
        const voucher = new Voucher(req.body);
        const savedVoucher = await voucher.save();
        res.status(201).send({ message: "Brand voucher added", data: savedVoucher });
    } catch (error) {
        console.log(err);
        next(createError(500, "internal server error: " + error.message));

    }
};

// UPDATE a voucher by ID
const updateVoucher = async (req, res, next) => {
    try {
        const voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!voucher) {
            return res.status(404).json({ message: 'Voucher not found' });
        }
        res.send({ message: "voucher updated", data: voucher });
    } catch (error) {
        console.log(err);
        next(createError(500, "internal server error: " + error.message));

    }
};

// DELETE a voucher by ID
const deleteVoucher = async (req, res, next) => {
    try {
        const voucher = await Voucher.findByIdAndDelete(req.params.id);
        if (!voucher) {
            return res.status(404).json({ message: 'Voucher not found' });
        }
        res.json({ message: 'Voucher deleted successfully' });
    } catch (error) {
        console.log(err);
        next(createError(500, "internal server error: " + error.message));

    }
};

module.exports = {
    getAllVouchers,
    getVoucherById,
    createVoucher,
    updateVoucher,
    deleteVoucher,
};
