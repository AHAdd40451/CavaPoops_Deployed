import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { Breed } from "../models/breed.model.js";
import { User } from "../models/user.model.js";
import getAuthUserId from "../middlewares/authUserId.js";
import { ObjectId } from "mongodb";

export const createProduct = async (req, res) => {
  try {
    const { category } = req.body;

    const categoryExists = await Breed.findById(category);
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
        model: Breed,
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

export const getAllProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await Product.find({ category: id })
      .populate({
        path: "createdBy",
        model: User,
        select: "name",
      })
      .populate({
        path: "category",
        model: Breed,
        select: "name",
      });

    if (!products) {
      return res.status(404).json({ error: "products not found." });
    }

    return res.json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the products." });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: "category",
      model: Breed,
      select: "name",
    });
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

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Puppies not found." });
    }

    if (category) {
      const categoryExists = await Breed.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ error: "Invalid Breed." });
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
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.json({ message: "Product deleted successfully." });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while deleting the product.",
      error: error.message,
    });
  }
};

export const createMultipleProducts = async (req, res) => {
  try {
    const products = req.body.products;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "No products provided." });
    }

    const savedProducts = [];
    for (const productData of products) {
      const { category } = productData;

      const categoryExists = await Breed.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ error: `Invalid category for product: ${productData.name || 'Unnamed'}.` });
      }

      const product = new Product(productData);
      await product.save();
      savedProducts.push(product);
    }

    return res.status(201).json({
      message: "Products created successfully",
      products: savedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the products.",
    });
  }
};

