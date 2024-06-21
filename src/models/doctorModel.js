import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    degrees: [String],
    password: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },
    youtube: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    feePerConsultation: {
      type: Number,
      required: true,
    },
    availableSlots: {
      type: Map,
      of: [String],
    },
    popular: {
      type: Boolean,
      default: false,
    },
    numberOfFeedback: {
      type: Number,
    },
    pending: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "DOCTOR",
    },
    allAppointments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    },
    sumOfRatings: {
      type: Number,
      default: 0,
      required: true,
    },
    feedbacks: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

export const Doctor =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
