const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/vouchers.controllers');
const { authJwt, objectId } = require('../middlewares');
var multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

// GET all vouchers
router.get('/admin/voucher', voucherController.getAllVouchers);

// GET a single voucher by ID
router.get('/admin/vouchers/:id', [objectId.validId], voucherController.getVoucherById);

// CREATE a new voucher
router.post('/admin/vouchers',upload.single("image"), [authJwt.isAdmin], voucherController.createVoucher);

// UPDATE a voucher by ID
router.put('/admin/vouchers/:id', [authJwt.isAdmin, objectId.validId], voucherController.updateVoucher);

// DELETE a voucher by ID
router.delete('/admin/vouchers/:id', [authJwt.isAdmin, objectId.validId], voucherController.deleteVoucher);

// users
router.get('/vouchers', voucherController.getAllVouchers);

// GET a single voucher by ID
router.get('/vouchers/:id', [objectId.validId], voucherController.getVoucherById);

module.exports = router;
