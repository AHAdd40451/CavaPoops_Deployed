import { Puppy } from "../models/puppy.model.js";

// Create a new pup
export const createPuppy = async (req, res) => {
  try {
    const puppy = new Puppy(req.body);
    await puppy.save();
    return res.status(201).json({ message: "Puppy created successfully", puppy });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the puppy.",
      details: error.message,
    });
  }
};

// Get a pup by ID
export const getPuppyById = async (req, res) => {
  try {
    const { id } = req.params;
    const puppy = await Puppy.findById(id);

    if (!puppy) {
      return res.status(404).json({ error: "Puppy not found." });
    }

    return res.json(puppy);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the puppy.",
      details: error.message,
    });
  }
};

// Get all pups
export const getAllPuppies = async (req, res) => {
  try {
    const puppies = await Puppy.find();
    return res.json(puppies);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the puppies.",
      details: error.message,
    });
  }
};

// Update a pup by ID
export const updatePuppy = async (req, res) => {
  try {
    const { id } = req.params;
    const puppy = await Puppy.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!puppy) {
      return res.status(404).json({ error: "Puppy not found." });
    }

    return res.json({ message: "Puppy updated successfully", puppy });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while updating the puppy.",
      details: error.message,
    });
  }
};

// Delete a pup by ID
export const deletePuppy = async (req, res) => {
  try {
    const { id } = req.params;
    const puppy = await Puppy.findByIdAndDelete(id);

    if (!puppy) {
      return res.status(404).json({ error: "Puppy not found." });
    }

    return res.json({ message: "Puppy deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while deleting the puppy.",
      details: error.message,
    });
  }
};
