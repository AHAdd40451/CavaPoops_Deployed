import express from "express";
import checkAuth from "../middlewares/jwt.js";
import { createPuppy, deletePuppy, getAllPuppies, getPuppyById, updatePuppy } from "../controllers/puppy.controller.js";

const puppyRoutes = express.Router();

// Create a Category
puppyRoutes.post("/puppy", createPuppy);

// Get a Category by ID
puppyRoutes.get("/puppy/:id", getPuppyById);

// Get all category
puppyRoutes.get("/puppies", getAllPuppies);

// Update a category
puppyRoutes.put("/puppy/:id", updatePuppy);

// Delete a BreeupdatePuppy
puppyRoutes.delete("/puppy/:id", deletePuppy);

export default puppyRoutes;
