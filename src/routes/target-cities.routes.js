import express from "express";
import {
  createTargetCity,
  deleteTargetCity,
  getAllTargetCities,
  getTargetCityById,
  updateTargetCity,
} from "../controllers/targetCity.controller.js";

const targetCityRoutes = express.Router();

// Create a Target City
targetCityRoutes.post("/target-city", createTargetCity);

// Get a Target City by ID
targetCityRoutes.get("/target-city/:id", getTargetCityById);

// Get all Target Cities
targetCityRoutes.get("/target-cities", getAllTargetCities);

// Update a Target City by ID
targetCityRoutes.put("/target-city/:id", updateTargetCity);

// Delete a Target City by ID
targetCityRoutes.delete("/target-city/:id", deleteTargetCity);

export default targetCityRoutes;
