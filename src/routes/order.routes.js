import express from "express";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";
import checkAuth from "../middlewares/jwt.js";

const orderRoutes = express.Router();

// Create an order
orderRoutes.post("/order", createOrder);

// Get an order by ID
orderRoutes.get("/order/:id", checkAuth, getOrderById);

// Get all orders
orderRoutes.get("/orders", getAllOrders);

// Update an order
orderRoutes.put("/order/:id", updateOrder);

// Delete an order
orderRoutes.delete("/order/:id", deleteOrder);

export default orderRoutes;
