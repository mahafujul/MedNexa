import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "ADMIN",
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
