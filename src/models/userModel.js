import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName:{
      type: String,
      required: true
    }, 
    lastName: {
      type: String,
      required: true
    },
    mobileNumber:{
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "USER"
    },
    allAppointments:{
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'appointments'}]
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
    unseenNotifications: {
      type: Array,
      default: [],
    },
    feedbacks: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'feedbacks'}],
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
