import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FaqCategory",
      required: true,
    },
    featured: { type: String },
  },
  {
    timestamps: true,
  }
);

const FaqCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const FaqCategory = mongoose.model("FaqCategory", FaqCategorySchema);
export const Faq = mongoose.model("Faq", FaqSchema);
