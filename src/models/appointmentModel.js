import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctorInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctors",
      required: true,
    },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    selectedTimeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    note: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    feedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "feedbacks",
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
