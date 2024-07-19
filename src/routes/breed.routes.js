import express from "express";
import {
  createBreed,
  deleteBreed,
  getAllBreeds,
  getBreedById,
  updateBreed,
} from "../controllers/breed.controller.js";
import checkAuth from "../middlewares/jwt.js";

const breedRoutes = express.Router();

// Create a Category
breedRoutes.post("/breed", createBreed);

// Get a Category by ID
breedRoutes.get("/breed/:id", getBreedById);

// Get all category
breedRoutes.get("/breeds", getAllBreeds);

// Update a category
breedRoutes.put("/breed/:id", updateBreed);

// Delete a BreeupdateBreed
breedRoutes.delete("/breed/:id", deleteBreed);

export default breedRoutes;
