import { TargetCity } from "../models/targetCities.model.js";

// Create a new Target City
export const createTargetCity = async (req, res) => {
  try {
    const targetCity = new TargetCity(req.body);
    await targetCity.save();
    return res
      .status(201)
      .json({ message: "Target City created successfully", targetCity });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the Target City.",
      details: error.message,
    });
  }
};

// Get a Target City by ID
export const getTargetCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const targetCity = await TargetCity.findById(id);

    if (!targetCity) {
      return res.status(404).json({ error: "Target City not found." });
    }

    return res.json(targetCity);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the Target City.",
      details: error.message,
    });
  }
};

// Get all Target Cities
export const getAllTargetCities = async (req, res) => {
  try {
    const targetCities = await TargetCity.find();
    return res.json(targetCities);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the Target Cities.",
      details: error.message,
    });
  }
};

// Update a Target City by ID
export const updateTargetCity = async (req, res) => {
  try {
    const { id } = req.params;
    const targetCity = await TargetCity.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!targetCity) {
      return res.status(404).json({ error: "Target City not found." });
    }

    return res.json({
      message: "Target City updated successfully",
      targetCity,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while updating the Target City.",
      details: error.message,
    });
  }
};

// Delete a Target City by ID
export const deleteTargetCity = async (req, res) => {
  try {
    const { id } = req.params;
    const targetCity = await TargetCity.findByIdAndDelete(id);

    if (!targetCity) {
      return res.status(404).json({ error: "Target City not found." });
    }

    return res.json({ message: "Target City deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while deleting the Target City.",
      details: error.message,
    });
  }
};
