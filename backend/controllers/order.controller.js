import Order from "../Models/order.model.js";


// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const user = req.user._id;
        const { products, totalAmount } = req.body;
        const newOrder = new Order({
            user,
            products,
            totalAmount,
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//delete a order
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// find the order based on the user id

export const getOrderByUser = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};