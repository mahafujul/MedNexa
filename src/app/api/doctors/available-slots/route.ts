// Import necessary modules and dependencies
import { NextResponse, NextRequest } from "next/server"; // Import Next.js server-side request and response modules
import { connect } from "@/config/dbConfig"; // Import the function to connect to the database
import { Doctor } from "@/models/doctorModel"; // Import the Doctor model

// Connect to the database
connect();

// Endpoint to retrieve available slots for a specific doctor and date
export async function GET(request: NextRequest) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId"); // Extract doctorId from the query parameters
    const date = searchParams.get("date"); // Extract date from the query parameters

    // Find the doctor in the database based on the provided doctorId
    const doctor = await Doctor.findOne({ _id: doctorId });
    if (!doctor) {
      // If the doctor is not found, return a JSON response with a 404 status code
      return NextResponse.json(
        { message: "Doctor not found", success: false },
        { status: 404 }
      );
    }

    // Retrieve available slots for the specified date from the doctor's availableSlots map
    const slots = doctor.availableSlots?.get(date) || [];

    // Return a JSON response with the retrieved slots and a 200 status code
    return NextResponse.json({ slots, success: true }, { status: 200 });
  } catch (err: any) {
    // If an error occurs during the process, return a JSON response with a 500 status code
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
}
