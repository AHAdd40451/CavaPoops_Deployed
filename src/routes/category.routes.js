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
categoryRoutes.post("/category", createCategory);

// Get a Category by ID
categoryRoutes.get("/category/:id", getCategoryById);

// Get all category
categoryRoutes.get("/categories", getAllCategories);

// Update a category
categoryRoutes.put("/category/:id", updateCategory);

// Delete a category
categoryRoutes.delete("/category/:id", deleteCategory);

export default categoryRoutes;
