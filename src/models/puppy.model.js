import mongoose from "mongoose";

const puppySchema = new mongoose.Schema({
  puppyInformation: {
    breed: {
      type: String,
      required: true,
    },
    breeder: {
      type: String,
      required: true,
    },
    kennel: {
      type: String,
    },
    cageNumber: {
      type: String,
    },
    color: {
      type: String,
    },
    idNumber: {
      type: String,
    },
    usdaId: {
      type: String,
    },
    localPickup: {
      type: Boolean,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    registration: {
      type: String,
      enum: ["ACA", "AKC", "CKC", "ICA", "n/a"],
    },
    akcAppNumber: {
      type: String,
    },
    dateAcquired: {
      type: Date,
    },
    dateOfBirth: {
      type: Date,
    },
    video: {
      type: String,
    },
    weight: {
      type: Number,
    },
    testResults: {
      type: [String],
    },
    meds: {
      type: [String],
    },
    dateSold: {
      type: Date,
    },
    wholesaleTransferDate: {
      type: Date,
    },
    purchaser: {
      type: String,
    },
    cost: {
      type: Number,
    },
  },
  listingInformation: {
    active: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    perfect10: {
      type: Boolean,
      default: false,
    },
    doNotList: {
      type: Boolean,
      default: false,
    },
    nurturingNotice: {
      type: String,
    },
    heading: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    whatComesWithDog: {
      type: [String],
    },
    price: {
      type: Number,
      required: true,
    },
    adultWeight: {
      type: Number,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    makeOffer: {
      type: Boolean,
      default: false,
    },
    offerPrice: {
      type: Number,
    },
    photos: {
      type: [String],
    },
    registrationPaperwork: {
      type: [String],
    },
    presalePups: {
      type: [String],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Puppy = mongoose.model("Puppy", puppySchema);
