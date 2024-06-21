// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/config/dbConfig";
import { Appointment } from "@/models/appointmentModel";

// Connect to the database
connect();

// Endpoint to retrieve all appointments with populated doctorInfo and userInfo
export async function GET(request: NextRequest) {
  try {
    // Define an aggregation pipeline to get all appointments with populated doctorInfo and userInfo
    const appointments = await Appointment.aggregate([
      {
        $lookup: {
          from: "doctors", // Collection name of the Doctor model
          localField: "doctorInfo",
          foreignField: "_id",
          as: "doctorInfo",
        },
      },
      {
        $unwind: "$doctorInfo", // Unwind the doctorInfo array to get a single object
      },
      {
        $lookup: {
          from: "users", // Collection name of the User model
          localField: "userInfo",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo", // Unwind the userInfo array to get a single object
      },
      {
        $project: {
          // Include necessary fields and concatenate doctor name
          "doctorInfo._id": 1,
          "doctorInfo.firstName": 1,
          "doctorInfo.lastName": 1,
          "doctorInfo.email": 1,
          "doctorInfo.phoneNumber": 1,
          "doctorInfo.address": 1,
          "doctorInfo.city": 1,
          "doctorInfo.specialization": 1,
          "doctorInfo.experience": 1,
          "doctorInfo.feePerConsultation": 1,
          "userInfo._id": 1,
          "userInfo.username": 1,
          "userInfo.email": 1,
          "userInfo.firstName": 1,
          "userInfo.lastName": 1,
          "userInfo.mobileNumber": 1,
          "userInfo.dob": 1,
          date: 1,
          note: 1,
          completed: 1,
          feedback: 1,
          timeSlot: "$selectedTimeSlot",
          doctorName: {
            $concat: ["$doctorInfo.firstName", " ", "$doctorInfo.lastName"],
          },
          patientName: {
            $concat: ["$userInfo.firstName", " ", "$userInfo.lastName"],
          },
        },
      },
    ]);

    // Return success response indicating the appointment has been successfully retrieved
    return NextResponse.json(
      {
        message: "Appointments retrieved successfully",
        appointments,
        success: true,
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
