import { Faq } from "../models/faqs.model.js";
import { FaqCategory } from "../models/faqs.model.js";

// Create a new FAQ
export const createFaq = async (req, res) => {
  try {
    const faq = new Faq(req.body);
    await faq.save();
    return res.status(201).json({ message: "FAQ created successfully", faq });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the FAQ.",
      details: error.message,
    });
  }
};

// Get a FAQ by ID
export const getFaqById = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findById(id).populate("category");

    if (!faq) {
      return res.status(404).json({ error: "FAQ not found." });
    }

    return res.json(faq);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the FAQ.",
      details: error.message,
    });
  }
};

// Get all FAQs
export const getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().populate("category");
    return res.json(faqs);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the FAQs.",
      details: error.message,
    });
  }
};

// Update a FAQ by ID
export const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!faq) {
      return res.status(404).json({ error: "FAQ not found." });
    }

    return res.json({ message: "FAQ updated successfully", faq });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while updating the FAQ.",
      details: error.message,
    });
  }
};

// Delete a FAQ by ID
export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findByIdAndDelete(id);

    if (!faq) {
      return res.status(404).json({ error: "FAQ not found." });
    }

    return res.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while deleting the FAQ.",
      details: error.message,
    });
  }
};

// Create a new FAQ Category
export const createFaqCategory = async (req, res) => {
  try {
    const category = new FaqCategory(req.body);
    await category.save();
    return res
      .status(201)
      .json({ message: "FAQ Category created successfully", category });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the FAQ Category.",
      details: error.message,
    });
  }
};

// Get all FAQ Categories
export const getAllFaqCategories = async (req, res) => {
  try {
    const categories = await FaqCategory.find();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the FAQ Categories.",
      details: error.message,
    });
  }
};

export const updateFaqCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await FaqCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!faq) {
      return res.status(404).json({ error: "FAQ Category not found." });
    }

    return res.json({ message: "FAQ Category updated successfully", faq });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while updating the FAQ.",
      details: error.message,
    });
  }
};

// Delete a FAQ Category by ID
export const deleteFaqCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await FaqCategory.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ error: "FAQ Category not found." });
    }

    return res.json({ message: "FAQ Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while deleting the FAQ Category.",
      details: error.message,
    });
  }
};
