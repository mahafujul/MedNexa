// Import necessary modules and dependencies
import { NextResponse } from "next/server";
import { Doctor } from "@/models/doctorModel";
import { connect } from "@/config/dbConfig";

// Connect to the database
connect();

// Endpoint to get all popular doctors sorted by numberOfFeedback in descending order
export async function GET() {
  try {
    // Aggregate popular doctors
    const popularDoctors = await Doctor.aggregate([
      { $match: { popular: true } }, // Filter only popular doctors
      { $limit: 16 }, // This operation returns only the first 16 documents passed to it by the pipeline
      {
        $project: {
          // Specify fields to include in the response
          _id: 1,
          username: 1,
          firstName: 1,
          lastName: 1,
          name: {
            $concat: ["Dr. ", "$firstName", " ", "$lastName"],
          },
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

    // Check if any popular doctors found
    if (popularDoctors.length === 0) {
      return NextResponse.json(
        { message: "No popular doctors found", success: false },
        { status: 404 }
      );
    }

    // Return a JSON response with popular doctors
    return NextResponse.json(
      {
        popularDoctors,
        message: "All popular doctors retrieved successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (err: any) {
    // Return a JSON response for internal server error with a status code (500)
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
}
