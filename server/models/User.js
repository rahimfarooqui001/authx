import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "manager", "staff", "user"],
    default: "user"
  },
  isVerified: { type: Boolean, default: false },
  twoFA: {
    enabled: { type: Boolean, default: false },
    secret: { type: String, default: null } // base32 secret
  }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);


