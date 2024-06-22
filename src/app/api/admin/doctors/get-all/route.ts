// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/config/dbConfig";
import { Doctor } from "@/models/doctorModel";

// Connect to the database
connect();

// Endpoint to retrieve all the doctors
export async function GET() {
  try {
    // Aggregate operation to retrieve specific fields and concatenate doctor names
    const doctors = await Doctor.aggregate([
      {
        $project: {
          username: 1,
          email: 1,
          city: 1,
          pending: 1,
          phoneNumber: 1,
          name: {
            $concat: ["Dr. ", "$firstName", " ", "$lastName"],
          },
        },
      },
    ]);
    // Return success response indicating the doctors have been successfully retrieved
    return NextResponse.json(
      { message: "Doctors retrieved successfully", success: true, doctors },
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
