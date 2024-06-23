// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Doctor } from "@/models/doctorModel";
import { connect } from "@/config/dbConfig";
import { getServerSession } from "next-auth/next"; // Import the getServerSession function from NextAuth
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // Import NextAuth options
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

//Connect to the database
connect();

// Endpoint to get details about a specific doctor
export async function GET(request: NextRequest) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Retrieve the userId from session
    const session = await getServerSession(authOptions);
    const userId = session?.user?.userId;

    // Check if userId is retrieved successfully
    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found in session", success: false },
        { status: 400 }
      );
    }

    // Find the doctor by userId using an aggregation pipeline
    const doctor = await Doctor.aggregate([
      // Match the user by userId
      { $match: { _id: new ObjectId(userId) } },

      // Lookup appointments
      {
        $lookup: {
          from: "appointments",
          localField: "allAppointments",
          foreignField: "_id",
          as: "allAppointments",
        },
      },

      // Unwind appointments to populate userInfo
      {
        $unwind: { path: "$allAppointments", preserveNullAndEmptyArrays: true },
      },

      // Lookup user info
      {
        $lookup: {
          from: "users",
          localField: "allAppointments.userInfo",
          foreignField: "_id",
          as: "allAppointments.userInfo",
        },
      },

      // Add a single userInfo object back to each appointment
      {
        $addFields: {
          "allAppointments.userInfo": {
            $arrayElemAt: ["$allAppointments.userInfo", 0],
          },
        },
      },

      // Group back to reconstruct allAppointments array
      {
        $group: {
          _id: "$_id",
          username: { $first: "$username" },
          email: { $first: "$email" },
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          phoneNumber: { $first: "$phoneNumber" },
          role: { $first: "$role" },
          feePerConsultation: { $first: "$feePerConsultation" },
          feedbacks: { $first: "$feedbacks" },
          allAppointments: { $push: "$allAppointments" },
        },
      },

      // Project fields and categorize appointments
      {
        $project: {
          username: 1,
          email: 1,
          firstName: 1,
          lastName: 1,
          phoneNumber: 1,
          role: 1,
          feePerConsultation: 1,
          feedbacks: 1,
          allAppointments: 1,
          doctorName: {
            $concat: ["$firstName", " ", "$lastName"],
          },
          todaySessions: {
            $filter: {
              input: "$allAppointments",
              as: "appointment",
              cond: {
                $and: [
                  { $gte: ["$$appointment.date", today] },
                  { $lt: ["$$appointment.date", tomorrow] },
                ],
              },
            },
          },
          upcomingSessions: {
            $filter: {
              input: "$allAppointments",
              as: "appointment",
              cond: { $gte: ["$$appointment.date", tomorrow] },
            },
          },
        },
      },
    ]);

    // Check if doctor exists
    if (!doctor) {
      // Return a JSON response indicating no doctor found with the given user ID
      return NextResponse.json(
        { message: "No doctor found with the given user ID", success: false },
        { status: 404 }
      );
    }

    // Return the doctor details as JSON response
    return NextResponse.json(
      { message: "Details successfully fetched", doctor, success: true },
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

//Endpoint to update a Doctor's account
export async function PUT(request: NextRequest) {
  try {
    // Retrieve the userId from session
    const session = await getServerSession(authOptions);
    const doctorId = session?.user?.userId;

    //Retrive updated data from requestBody
    const reqBody = await request.json();

    // Find the doctor user by doctorId and update
    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { ...reqBody },
      { new: true }
    );

    if (!doctor) {
      // Return a JSON response indicating no doctor found with the given doctor ID
      return NextResponse.json(
        { message: "No doctor found with the given doctor ID", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Profine successfully updated.",
        updatedDoctor: doctor,
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
