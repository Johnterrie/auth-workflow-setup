import { Document } from "mongoose";
import mongoose from "mongoose";

interface IOrders extends Document {
  name: { type: String; required: true };
  image: { type: String; required: true };
  price: { type: Number; required: true };
  amount: { type: Number; required: true };
  product: {
    type: typeof mongoose.Schema.ObjectId;
    ref: "Product";
    required: true;
  };
  timestamps: Boolean;
  tax: {
    type: Number;
    required: true;
  };
  shippingFee: {
    type: Number;
    required: true;
  };
  subtotal: {
    type: Number;
    required: true;
  };
  total: {
    type: Number;
    required: true;
  };
  orderItems: [
    name: { type: String; required: true },
    image: { type: String; required: true },
    price: { type: Number; required: true },
    amount: { type: Number; required: true },
    product: {
      type: typeof mongoose.Schema.ObjectId;
      ref: "Product";
      required: true;
    }
  ];
  status: {
    type: String;
    enum: ["pending", "failed", "paid", "delivered", "canceled"];
    default: "pending";
  };
  user: {
    type: typeof mongoose.Schema.ObjectId;
    ref: "User";
    required: true;
  };
  clientSecret: {
    type: String;
    required: true;
  };
  paymentIntentId: {
    type: String;
  };
}

export default IOrders;
