import express from "express";
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  // createMultipleProducts,
} from "../controllers/product.controller.js";
import checkAuth from "../middlewares/jwt.js";

const productRoutes = express.Router();

// Create a product
productRoutes.post("/product", checkAuth, createProduct);

// Get a product by ID
productRoutes.get("/product/:id", checkAuth, getProductById);

// Get all products
productRoutes.get("/products", checkAuth, getAllProducts);

// Update a product
productRoutes.put("/product/:id", checkAuth, updateProduct);

// Delete a product
productRoutes.delete("/product/:id", checkAuth, deleteProduct);

// // Delete a product
// productRoutes.post("/multiple/product", checkAuth, createMultipleProducts);

export default productRoutes;
