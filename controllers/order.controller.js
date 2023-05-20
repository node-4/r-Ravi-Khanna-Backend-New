const Order = require("../models/order.model");

// Create a new order
exports.createOrder = async (req, res, next) => {
    try {
        const order = new Order({
            transactionType: req.body.transactionType,
            amount: req.body.amount
        });
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (err) {

        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
};

// Get all orders
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        if (orders.length === 0) {
            return res.status(404).send({ message: "orders not found" });
        };
        res.status(200).json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
};

// Get an order by ID
exports.getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
};

// Update an order by ID
exports.updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(updatedOrder);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
};

// Delete an order by ID
exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "order deleted" });
        res.status(204).end();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
};
