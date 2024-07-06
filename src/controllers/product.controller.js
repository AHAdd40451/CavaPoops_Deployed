import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";
import getAuthUserId from "../middlewares/authUserId.js";
import { ObjectId } from "mongodb";

export const createProduct = async (req, res) => {
  try {
    const { category } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid category." });
    }

    const product = new Product(req.body);
    await product.save();

    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the Product.",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate({
        path: "createdBy",
        model: User,
        select: "name",
      })
      .populate({
        path: "category",
        model: Category,
        select: "name",
      });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the Product." });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while retrieving the Products. " + error,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    const userId = await getAuthUserId(req);
    const resultUser = await User.findById(userId);

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    if (resultUser.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this product." });
    }

    // Check if category exists
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ error: "Invalid category." });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while updating the Product.",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await getAuthUserId(req);
    const product = await Product.findById(id);
    const resultUser = await User.findById(userId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    if (resultUser.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this product." });
    }

    await Product.findByIdAndDelete(id);

    return res.json({ message: "Product deleted successfully." });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while deleting the product.",
      error: error.message,
    });
  }
};
