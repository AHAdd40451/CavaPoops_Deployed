import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    metaDescription: { type: String, required: true },
    pageTitle: { type: String, required: true },
    required: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    special: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", categorySchema);
