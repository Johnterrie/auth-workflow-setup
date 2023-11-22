import mongoose, { Schema } from "mongoose";
import iToken from "../types/Token";

const TokenSchema: Schema<iToken> = new mongoose.Schema(
  {
    refreshToken: { type: String, required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    isValid: { type: Boolean, default: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Token = mongoose.model<iToken>("Token", TokenSchema);
export default Token;
