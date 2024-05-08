import mongoose from 'mongoose'


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
    about:{
      type: String,
      required: true
    },
    degrees: [{type: String}],
    password: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    youtube: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city:  {
      type: String,
      required: true
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    feePerCunsultation: {
      type: Number,
      required: true,
    },
    timings : {
      type: Array,
      required: true,
    },
    popular:{
      type: Boolean,
      default: false
    },
    numberOfFeedback:{
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
    },
    allAppointments:{
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'appointments'}]
    },
    sumOfRatings:{
      type: Number,
      default: 0,
      required: true
    },
    feedbacks: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'feedbacks'}],
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

export const Doctor = mongoose.models.Doctor || mongoose.model("doctors", doctorSchema);
