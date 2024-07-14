import express from "express";
import {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
  // createMultipleProducts,
} from "../controllers/category.controller.js";
import checkAuth from "../middlewares/jwt.js";

const categoryRoutes = express.Router();

// Create a Category
categoryRoutes.post("/category", checkAuth, createCategory);

// Get a Category by ID
categoryRoutes.get("/category/:id", checkAuth, getCategoryById);

// Get all category
categoryRoutes.get("/categories", getAllCategories);

// Update a category
categoryRoutes.put("/category/:id", checkAuth, updateCategory);

// Delete a category
categoryRoutes.delete("/category/:id", checkAuth, deleteCategory);

export default categoryRoutes;
