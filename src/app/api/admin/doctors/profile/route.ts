import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/config/dbConfig";
import { Doctor } from "@/models/doctorModel";
import mongoose from "mongoose";

// Connect to the database
connect();

// Endpoint to retrieve details of a specific doctor.
export async function GET(request: NextRequest) {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const reqUrl = request.url;
    const { searchParams } = new URL(reqUrl);
    const doctorId = searchParams.get("doctorId")?.toString();

    // Aggregate query to fetch specific fields of the doctor
    const doctor = await Doctor.aggregate([
      {
        $match: {
          _id: new ObjectId(doctorId),
        },
      },
      {
        $project: {
          // Specify fields to include in the response
          username: 1,
          firstName: 1,
          lastName: 1,
          url: 1,
          email: 1,
          phoneNumber: 1,
          about: 1,
          specialization: 1,
          degrees: 1,
          address: 1,
          city: 1,
          experience: 1,
          feePerConsultation: 1,
        },
      },
    ]);

    // Handle case where no doctor is found with the given ID
    if (!doctor.length) {
      return NextResponse.json(
        { message: "Doctor not found", success: false },
        { status: 404 } // Not Found status code
      );
    }

    // Return successful response with doctor details
    return NextResponse.json(
      {
        message: "Doctor details retrieved successfully",
        doctor,
        success: true,
      },
      { status: 200 } // OK status code
    );
  } catch (err: any) {
    // Return a JSON response for internal server error with a status code (500)
    return NextResponse.json(
      { message: "Internal Server Error", success: false, error: err.message },
      { status: 500 } // Internal Server Error status code
    );
  }
}

// Endpoint to update details of a specific doctor
export async function PUT(request: NextRequest) {
  try {
    // Retrieve data from request body
    const reqBody = await request.json();

    // Retrieve doctorId from query param
    const reqUrl = request.url;
    const { searchParams } = new URL(reqUrl);
    const doctorId = searchParams.get("doctorId")?.toString();

    // Find and update the doctor's details
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { _id: doctorId },
      { ...reqBody },
      { new: true } // Return updated document
    );

    // Return successful response with a message
    return NextResponse.json(
      { message: "Doctor profile updated successfully", success: true },
      { status: 200 } // OK status code
    );
  } catch (err: any) {
    // Return a JSON response for internal server error with a status code (500)
    return NextResponse.json(
      { message: "Internal Server Error", success: false, error: err.message },
      { status: 500 } // Internal Server Error status code
    );
  }
}
