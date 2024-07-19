import mongoose from "mongoose";

// Schema for breed information
const breedInformationSchema = new mongoose.Schema({
  breedName: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  petPlanBreedId: { type: String, trim: true },
  alternateNames: [String],
  safeAlternateNames: [String],
  relatedBreeds: [String],
  isActive: { type: Boolean },
  primaryPhoto: {
    url: { type: String, trim: true },
    alt: { type: String, trim: true },
    title: { type: String, trim: true },
  },
  characteristicsPhoto: {
    url: { type: String, trim: true },
    alt: { type: String, trim: true },
    title: { type: String, trim: true },
  },
  avatarPhoto: {
    url: { type: String, trim: true },
    alt: { type: String, trim: true },
    title: { type: String, trim: true },
  },
  coverSales: {
    url: { type: String, trim: true },
    alt: { type: String, trim: true },
    title: { type: String, trim: true },
  },
  coverInfo: {
    url: { type: String, trim: true },
    alt: { type: String, trim: true },
    title: { type: String, trim: true },
  },
  breedPhotos: [String],
  frequentlyAskedQuestions: [
    {
      question: { type: String, trim: true },
      answer: { type: String, trim: true },
    },
  ],
  locationsCityInfo: {
    title: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    heading: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  breederCityInfo: {
    title: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    heading: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  breedCityInfo: {
    title: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    heading: { type: String, trim: true },
    description: { type: String, trim: true },
  },
});

// Schema for breed details
const breedDetailsSchema = new mongoose.Schema({
  slug: { type: String, required: true, trim: true, unique: true },
  pageTitle: { type: String, trim: true },
  metaDescription: { type: String, trim: true },
  heading: { type: String, trim: true },
  breedTypeMix: { type: String, trim: true },
  energyLevel: { type: String, trim: true },
  shedding: { type: String, trim: true },
  training: { type: String, trim: true },
  temperament: { type: String, trim: true },
  adultWeight: { type: String, trim: true },
  adultHeight: { type: String, trim: true },
  lifespan: { type: String, trim: true },
  compareCaption: { type: String, trim: true },
  overview: { type: String, trim: true },
  characteristics: { type: String, trim: true },
  breeders: { type: String, trim: true },
  appearance: { type: String, trim: true },
  temperamentDetails: { type: String, trim: true },
  insights: { type: String, trim: true },
  history: { type: String, trim: true },
  care: { type: String, trim: true },
  video: { type: String, trim: true },
  breedSalesDetails: {
    title: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    heading: { type: String, trim: true },
    subheading: { type: String, trim: true },
    topDescription: { type: String, trim: true },
    breedDescription: { type: String, trim: true },
    maintenance: { type: Number },
    training: { type: Number },
    shedding: { type: Number },
    adaptability: { type: Number },
    active: { type: Number },
  },
  seoDetails: [
    {
      title: { type: String, trim: true },
      metaDescription: { type: String, trim: true },
      heading: { type: String, trim: true },
      description: { type: String, trim: true },
    },
  ],
});

// Main schema combining breed information and breed details
const breedSchema = new mongoose.Schema({
  breedInformation: breedInformationSchema,
  breedDetails: breedDetailsSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Breed = mongoose.model("Breed", breedSchema);
