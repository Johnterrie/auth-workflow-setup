import { Document } from "mongoose";
import mongoose from "mongoose";

interface IReview extends Document {
  rating: {
    type: Number;
    min: 1;
    max: 5;
    required: [true, "Please provide rating"];
  };
  title: {
    type: String;
    trim: true;
    required: [true, "Please provide review title"];
    maxlength: 100;
  };
  comment: {
    type: String;
    required: [true, "Please provide review text"];
  };
  user: {
    type: typeof mongoose.Schema.ObjectId;
    ref: "User";
    required: true;
  };
  product: {
    type: typeof mongoose.Schema.ObjectId;
    ref: "Product";
    required: true;
  };
  calculateAverageRating: (productId: mongoose.Types.ObjectId) => Promise<void>;
  timestamps: Boolean;
}

export default IReview;
