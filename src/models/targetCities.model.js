import mongoose from "mongoose";

const TargetCitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    state: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  {
    timestamps: { createdAt: "created" },
  }
);

export const TargetCity = mongoose.model("TargetCity", TargetCitySchema);
