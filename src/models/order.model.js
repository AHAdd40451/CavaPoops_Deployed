import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    zipcode: { type: String },
    deliveryMethod: {
      type: String,
    },
    pickupPoint: { type: String },
    orderStatus: { type: String, default: "pending" },
    deliveryCharges: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orderSummary: {
      deliveryMethodCharge: { type: Number },
      subtotal: { type: Number },
      coupon: { type: String, default: "none" },
      discount: { type: Number, default: 0 },
      salesTax: { type: Number, default: 0 },
      orderTotal: { type: Number },
    },
    contactInformation: {
      emailAddress: { type: String },
      cellPhone: { type: String },
    },
    destinationAddress: {
      firstName: { type: String },
      lastName: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      driversLicenseNumber: { type: String },
      instagramUsername: { type: String },
    },
    billingAddress: {
      sameAsDestination: { type: Boolean, default: true },
      firstName: { type: String },
      lastName: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
    paymentOptions: {
      method: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
