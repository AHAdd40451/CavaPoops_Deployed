import { Product } from "../models/product.model.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the product.",
      details: error.message,
    });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the product.",
      details: error.message,
    });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the products.",
      details: error.message,
    });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.json({ message: "Product updated successfully", product });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while updating the product.",
      details: error.message,
    });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while deleting the product.",
      details: error.message,
    });
  }
};
