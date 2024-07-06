import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    photo: [String],
    price: { type: String },
    unit: {
      type: String,
      default: "$",
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },

  {
    timestamps: true,
  }
);

export const Product = mongoose.model("product", productSchema);
