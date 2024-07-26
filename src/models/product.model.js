import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    media: { type: [String] },
    title: { type: String },
    description: { type: String },
    id: { type: String },
    name: { type: String },
    price: { type: Number },
    wholesaleCost: { type: Number },
    storeSold: { type: Number, default: 0 },
    nkSold: { type: Number, default: 0 },
    inventoryCost: { type: Number, default: 0 },
    displayOrder: { type: Number },
    active: { type: Boolean, default: true },
    required: { type: Boolean, default: false },
    preSelected: { type: Boolean, default: false },
    noSalesTax: { type: Boolean, default: false },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", ProductSchema);
