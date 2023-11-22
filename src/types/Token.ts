import { Document } from "mongoose";
import mongoose from "mongoose";

interface IToken extends Document {
  refreshToken: { type: String; required: true };
  ip: { type: String; required: true };
  userAgent: { type: String; required: true };
  isValid: { type: Boolean; default: true };
  user: {
    type: mongoose.Types.ObjectId;
    ref: "User";
    required: true;
  };

  timestamps: Boolean;
}

export default IToken;
