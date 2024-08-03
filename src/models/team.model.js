import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    showOnTeamPage: { type: Boolean, default: true },
    description: { type: String },
    quote: { type: String },
    authorBlock: { type: String },
    primaryPhoto: { type: String }, // URL or path to the photo
  },
  {
    timestamps: true,
  }
);

export const Team = mongoose.model("Team", TeamSchema);
