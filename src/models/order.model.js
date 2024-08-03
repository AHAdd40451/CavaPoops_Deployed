import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    puppies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Puppy" }],
    zipcode: { type: String },
    deliveryMethod: { type: String },
    pickupPoint: { type: String },
    orderId: { type: Number },
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
      payType: { type: String },
      method: { type: String },
    },
  },
  { timestamps: true }
);

// Middleware to generate sequential orderId without a counter schema
orderSchema.pre("save", async function (next) {
  const order = this;
  if (order.isNew) {
    try {
      const lastOrder = await mongoose
        .model("Order")
        .findOneAndUpdate(
          {},
          { $inc: { orderId: 1 } },
          { sort: { orderId: -1 }, new: true }
        );

      order.orderId = lastOrder ? lastOrder.orderId : 1;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export const Order = mongoose.model("Order", orderSchema);
