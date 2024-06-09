// Import necessary modules and dependencies
import mongoose from "mongoose";
import { connect } from "@/config/dbConfig";
import { Doctor } from "@/models/doctorModel";
import { Appointment } from "@/models/appointmentModel";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

// Connect to the database
connect();

// Endpoint to get all the appointments of a specific doctor
export async function GET() {
  try {
    // Retrieve the session information to get the doctor's user ID
    const session = await getServerSession(authOptions);
    const doctorId = session?.user?.userId;

    // Check if the doctor ID is present in the session
    if (!doctorId) {
      return NextResponse.json(
        { message: "No user ID found in session", success: false },
        { status: 400 }
      );
    }

    // Aggregation pipeline to retrieve doctor's appointments with user details
    const appointments = await Doctor.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(doctorId) } },
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
          from: "users",
          localField: "appointmentDetails.userInfo",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: "$appointmentDetails._id",
          status: "$appointmentDetails.status",
          completed: "$appointmentDetails.completed",
          timeSlot: "$appointmentDetails.selectedTimeSlot",
          userName: {
            $concat: ["$userDetails.firstName", " ", "$userDetails.lastName"],
          },
          date: "$appointmentDetails.date",
        },
      },
      { $sort: { date: 1 } }, // Sort appointments based on date in increasing order
    ]);

    // Check if any appointments are retrieved
    if (!appointments.length) {
      return NextResponse.json(
        { message: "No appointments found for the user", success: false },
        { status: 400 }
      );
    }

    // Respond with the retrieved appointments
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
