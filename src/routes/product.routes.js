import express from "express";
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllProductsByCategory,
  // createMultipleProducts,
} from "../controllers/product.controller.js";
import checkAuth from "../middlewares/jwt.js";

const productRoutes = express.Router();

// Create a product
productRoutes.post("/product", createProduct);

// Get a product by ID
productRoutes.get("/product/:id", checkAuth, getProductById);

// Get all products
productRoutes.get("/products", getAllProducts);
// Get all products
productRoutes.get("/productsByCategory/:id", getAllProductsByCategory);

// Update a product
productRoutes.put("/product/:id", updateProduct);

// Delete a product
productRoutes.delete("/product/:id", deleteProduct);

// // Delete a product
// productRoutes.post("/multiple/product", createMultipleProducts);

export default productRoutes;
