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
