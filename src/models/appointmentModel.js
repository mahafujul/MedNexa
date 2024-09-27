import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctorInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    note: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    feedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
