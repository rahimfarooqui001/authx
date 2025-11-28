// import mongoose from "mongoose";
// import validator from "validator";

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true, minlength: 2 },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: validator.isEmail
//   },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ["admin", "manager", "staff", "user"],
//     default: "user"
//   },
//   isVerified: { type: Boolean, default: false },
//   twoFA: {
//     enabled: { type: Boolean, default: false },
//     secret: { type: String, default: null } // base32 secret
//   }
// }, { timestamps: true });

// export default mongoose.model("User", UserSchema);



import mongoose from "mongoose";
import validator from "validator";

const RecoveryCodeSchema = new mongoose.Schema({
  code: { type: String, required: true },   // hashed code
  used: { type: Boolean, default: false },
  usedAt: { type: Date, default: null }
}, { _id: false });

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
    enum: ["admin", "manager", "staff"],
    default: "admin"
  },

  isVerified: { type: Boolean, default: false },

  twoFA: {
    enabled: { type: Boolean, default: false },
    secret: { type: String, default: null }, // base32 TOTP secret

    // NEW recovery codes field
    recoveryCodes: {
      type: [RecoveryCodeSchema],
      default: []
    }
  }

}, { timestamps: true });

export default mongoose.model("User", UserSchema);
