import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";
import getAuthUserId from "../middlewares/authUserId.js";
import { ObjectId } from "mongodb";


export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the category.",
      details: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    return res.json(category);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the category.",
      details: error.message,
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the categories.",
      details: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    return res.json({ message: "Category updated successfully", category });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while updating the category.",
      details: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    return res.json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while deleting the category.",
      details: error.message,
    });
  }
};
