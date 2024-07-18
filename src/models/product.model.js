import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    photo: [String],
    price: { type: String },
    discountedPrice: { type: String },
    unit: {
      type: String,
      default: "$",
    },
    ageOfPuppies: { type: String },
    weightLbs: { type: Number },
    weightOunce: { type: Number },
    inStock: { type: Number },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    gender: { type: String },
    registry: { type: String },
    vacations: { type: String },
    vetInspection: { type: String },
    birthDate: { type: String },
    healthRecords: {
      specialNurturingNotice: { type: String },
      note: { type: String },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
