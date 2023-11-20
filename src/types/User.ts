import { Document } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  name: {
    type: String;
    required: [true, "Please provide name"];
    minlength: 3;
    maxlength: 20;
    trim: true;
  };
  email: {
    type: String;
    required: [true, "Please provide email"];
    validate: {
      validator: typeof validator.isEmail;
      message: "Please provide valid email";
    };
    unique: true;
  };
  password: {
    type: String;
    required: [true, "Please provide password"];
    minlength: 6;
  };
  role: {
    type: String;
    enum: ["admin", "user"];
    default: "user";
  };
  verificationToken: String;

  isVerified: {
    type: Boolean;
    default: false;
  };

  verified: Date;

  passwordToken: {
    type: String;
  };

  passwordTokenExpirationDate: {
    type: Date;
  };
}

export default IUser;
