import { Breed } from "../models/breed.model.js";
import { Category } from "../models/category.model.js";
// Create a new breed
export const createBreed = async (req, res) => {
  try {
    const breed = new Breed(req.body);
    await breed.save();
    return res
      .status(201)
      .json({ message: "Breed created successfully", breed });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the breed.",
      details: error.message,
    });
  }
};

// Get a breed by ID
export const getBreedById = async (req, res) => {
  try {
    const { id } = req.params;
    const breed = await Breed.findById(id);

    if (!breed) {
      return res.status(404).json({ error: "Breed not found." });
    }

    return res.json(breed);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the breed.",
      details: error.message,
    });
  }
};

// Get all breeds
export const getAllBreeds = async (req, res) => {
  try {
    const breeds = await Breed.find().populate({
      path: "breedInformation.category",
      model: Category,
      select: "name",
    });
    return res.json(breeds);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the breeds.",
      details: error.message,
    });
  }
};

// Update a breed by ID
export const updateBreed = async (req, res) => {
  try {
    const { id } = req.params;
    const breed = await Breed.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!breed) {
      return res.status(404).json({ error: "Breed not found." });
    }

    return res.json({ message: "Breed updated successfully", breed });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while updating the breed.",
      details: error.message,
    });
  }
};

// Delete a breed by ID
export const deleteBreed = async (req, res) => {
  try {
    const { id } = req.params;
    const breed = await Breed.findByIdAndDelete(id);

    if (!breed) {
      return res.status(404).json({ error: "Breed not found." });
    }

    return res.json({ message: "Breed deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while deleting the breed.",
      details: error.message,
    });
  }
};
