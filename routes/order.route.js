const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { authJwt, objectId } = require("../middlewares");

// Create a new order
router.post("/order", [authJwt.verifyToken], orderController.createOrder);

// Get all orders
router.get("/order", orderController.getOrders);

// Get an order by ID
router.get("/order/:id", [authJwt.verifyToken, objectId.validId], orderController.getOrderById);

// Update an order by ID
router.patch("/order/:id", [authJwt.verifyToken, objectId.validId], orderController.updateOrder);

// Delete an order by ID
router.delete("/order/:id", [authJwt.verifyToken, objectId.validId], orderController.deleteOrder);

router.get("/admins/order", [authJwt.isAdmin], orderController.getOrders);

// Get an order by ID
router.get("/admin/order/:id", [authJwt.isAdmin, objectId.validId], orderController.getOrderById);

// Update an order by ID
router.patch("/admin/order/:id", [authJwt.isAdmin, objectId.validId], orderController.updateOrder);

// Delete an order by ID
router.delete("/admin/order/:id", [authJwt.isAdmin, objectId.validId], orderController.deleteOrder);

module.exports = router;
