import mongoose from "mongoose";
import { connect } from "@/config/dbConfig";
import { User } from "@/models/userModel";
import { Appointment } from "@/models/appointmentModel";
import { Doctor } from "@/models/doctorModel";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

// Connect to the database
connect();

// Endpoint to get all the appointments of a specific user
export async function GET() {
  try {
    // Retrieve the session information
    const session = await getServerSession(authOptions);
    const userId = session?.user?.userId;

    if (!userId) {
      return NextResponse.json(
        { message: "No user ID found in session", success: false },
        { status: 400 }
      );
    }

    // Aggregation pipeline
    const appointments = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$allAppointments" },
      {
        $lookup: {
          from: "appointments",
          localField: "allAppointments",
          foreignField: "_id",
          as: "appointmentDetails",
        },
      },
      { $unwind: "$appointmentDetails" },
      {
        $lookup: {
          from: "doctors",
          localField: "appointmentDetails.doctorInfo",
          foreignField: "_id",
          as: "doctorDetails",
        },
      },
      { $unwind: "$doctorDetails" },
      {
        $project: {
          _id: "$appointmentDetails._id",
          timeSlot: "$appointmentDetails.selectedTimeSlot",
          completed: "$appointmentDetails.completed",
          doctorName: {
            $concat: [
              "$doctorDetails.firstName",
              " ",
              "$doctorDetails.lastName",
            ],
          },
          date: "$appointmentDetails.date",
        },
      },
      { $sort: { date: 1 } }, // Sort appointments based on date in increasing order
    ]);

    // Check if the user exists who is trying to create the appointment
    if (!appointments.length) {
      return NextResponse.json(
        { message: "No appointments found for the user", success: false },
        { status: 400 }
      );
    }

    // Respond with a success message
    return NextResponse.json(
      {
        message: "Appointments successfully retrieved.",
        appointments: appointments,
      },
      { status: 200 }
    );
  } catch (err: any) {
    // Return a JSON response for internal server error
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
}
