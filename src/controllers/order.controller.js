import { Order } from "../models/order.model.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the order.",
      details: error.message,
    });
  }
};

// Get an order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("products");

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    return res.json(order);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the order.",
      details: error.message,
    });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products").populate("puppies");
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the orders.",
      details: error.message,
    });
  }
};

// Update an order by ID
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    return res.json({ message: "Order updated successfully", order });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while updating the order.",
      details: error.message,
    });
  }
};

// Delete an order by ID
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    return res.json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while deleting the order.",
      details: error.message,
    });
  }
};
