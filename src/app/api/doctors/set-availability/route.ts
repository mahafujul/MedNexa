import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/config/dbConfig";
import { Doctor } from "@/models/doctorModel";

// Connect to the MongoDB database
connect();

// Endpoint to set available slots for a specific doctor on a particular date
export async function POST(request: NextRequest) {
  try {
    // Parse the request body to extract doctorId, date, and slots
    const { doctorId, date, slots } = await request.json();

    // Find the doctor in the database based on the provided doctorId
    const doctor = await Doctor.findOne({ _id: doctorId });

    // Check if the doctor exists
    if (!doctor) {
      // Return a JSON response with a 404 status code if the doctor is not found
      return NextResponse.json(
        { message: "Doctor not found", success: false },
        { status: 404 }
      );
    }

    // Update the doctor's available slots for the specified date
    doctor.availableSlots.set(date, slots);

    // Save the updated doctor information to the database
    await doctor.save();

    // Return a JSON response indicating successful update of availability
    return NextResponse.json(
      { message: "Availability updated successfully", success: true },
      { status: 200 }
    );
  } catch (err: any) {
    // Return a JSON response for internal server error if an error occurs during the process
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
}
